/* ==========================================================================
   AURA SMART HOME OS v2 - INTERACTIVE ENGINE (JAVASCRIPT)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // ----------------------------------------------------------------------
    // 1. STATE MANAGEMENT
    // ----------------------------------------------------------------------
    const state = {
        activeTab: 'floorplan',
        latency: 0.8,
        avgTemp: 22.4,
        targetTemp: 25.0,
        isPlayingMusic: false,
        currentTrackIndex: 0,
        tracks: [
            { name: 'Lofi Ambient Chill', artist: 'AURA Audio Edge' },
            { name: 'Sunset Relaxing Piano', artist: 'Circadian Sound Engine' },
            { name: 'Smooth Jazz Night', artist: 'Living Room Media Hub' },
            { name: 'Nature Rain & Waves', artist: 'Sleep Wellness Agent' }
        ],
        doors: {
            bedroom: false, // false = KAPALI, true = AÇIK
            kitchen: true,
            bathroom: false,
            livingroom: true
        },
        hvac: {
            underfloor: 'Aktif (%60 Güç)',
            ac: 'Eko Mod (22.4°C)',
            radiator: 'Dengeli Devrede'
        },
        water: {
            greywater: 145, // Litre
            semigreywater: 98,
            recycledTotal: 195,
            tapConsumption: 243,
            efficiency: 80.2
        },
        motionDetected: false,
        alarmActive: true
    };

    // ----------------------------------------------------------------------
    // 2. DOM ELEMENTS
    // ----------------------------------------------------------------------
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('page-title');
    const liveClock = document.getElementById('live-clock');

    // Quick Simulation Buttons
    const btnWelcomeHome = document.getElementById('btn-welcome-home');
    const btnTarget25 = document.getElementById('btn-target-25');
    const btnSimMotion = document.getElementById('btn-sim-motion');
    const btnToggleAllDoors = document.getElementById('btn-toggle-all-doors');

    // Stats Elements
    const statAvgTemp = document.getElementById('stat-avg-temp');
    const statDoorsStatus = document.getElementById('stat-doors-status');
    const statRecycledWater = document.getElementById('stat-recycled-water');
    const statPowerDraw = document.getElementById('stat-power-draw');

    // Music Player
    const btnToggleMusic = document.getElementById('btn-toggle-music');
    const btnNextTrack = document.getElementById('btn-next-track');
    const btnPrevTrack = document.getElementById('btn-prev-track');
    const currentTrackName = document.getElementById('current-track');
    const musicIcon = document.getElementById('music-icon');

    // AI Chat
    const chatInput = document.getElementById('chat-input');
    const btnSendChat = document.getElementById('btn-send-chat');
    const chatMessages = document.getElementById('chat-messages');

    // ----------------------------------------------------------------------
    // 3. REALTIME CLOCK & LATENCY SIMULATOR
    // ----------------------------------------------------------------------
    function updateClock() {
        const now = new Date();
        if (liveClock) liveClock.textContent = now.toLocaleTimeString('tr-TR');
    }
    setInterval(updateClock, 1000);
    updateClock();

    setInterval(() => {
        state.latency = (0.6 + Math.random() * 0.4).toFixed(1);
        const latElem = document.getElementById('server-latency');
        if (latElem) latElem.textContent = `${state.latency} ms`;
    }, 3000);

    // ----------------------------------------------------------------------
    // 4. TAB NAVIGATION
    // ----------------------------------------------------------------------
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            item.classList.add('active');
            const targetElem = document.getElementById(`tab-${targetTab}`);
            if (targetElem) targetElem.classList.add('active');

            const titles = {
                floorplan: 'Kuşbakışı Kat Planı & Otonom Ev Yönetimi',
                water: 'Sürdürülebilir Evsel Su Arıtma & Geri Dönüşüm',
                'ai-advisor': 'Evin İçindeki Sunucuda Çalışan Yerel AI Asistanı',
                'energy-security': 'Elektrik Tüketim Analizi & Güvenlik Paneli',
                academic: 'MIT & Harvard Araştırma Raporu & Sunum Rehberi'
            };
            if (pageTitle && titles[targetTab]) {
                pageTitle.textContent = titles[targetTab];
            }

            if (window.lucide) lucide.createIcons();
        });
    });

    // ----------------------------------------------------------------------
    // 5. MOTORIZED DOORS LOGIC
    // ----------------------------------------------------------------------
    function updateDoorsUI() {
        let openCount = 0;
        Object.keys(state.doors).forEach(doorKey => {
            const isOpen = state.doors[doorKey];
            if (isOpen) openCount++;

            const badgeElem = document.getElementById(`door-status-${doorKey}`);
            if (badgeElem) {
                if (isOpen) {
                    badgeElem.textContent = 'AÇIK';
                    badgeElem.classList.add('open');
                } else {
                    badgeElem.textContent = 'KAPALI';
                    badgeElem.classList.remove('open');
                }
            }
        });

        if (statDoorsStatus) {
            statDoorsStatus.textContent = `${openCount} Kapı Açık / ${4 - openCount} Kapalı`;
        }
    }

    document.querySelectorAll('.door-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const doorKey = btn.getAttribute('data-door');
            if (doorKey && state.doors[doorKey] !== undefined) {
                state.doors[doorKey] = !state.doors[doorKey];
                updateDoorsUI();
                addAiRecommendation(`Motorlu Kapı Uyarısı: ${doorKey.toUpperCase()} kapısı ${state.doors[doorKey] ? 'otomatik AÇILDI' : 'güvenli KAPATILDI'}.`);
            }
        });
    });

    if (btnToggleAllDoors) {
        btnToggleAllDoors.addEventListener('click', () => {
            const hasClosed = Object.values(state.doors).some(val => !val);
            Object.keys(state.doors).forEach(k => {
                state.doors[k] = hasClosed;
            });
            updateDoorsUI();
            addAiRecommendation(`Tüm motorlu kapılar otonom olarak ${hasClosed ? 'AÇILDI' : 'KİLİTLENDİ'}.`);
        });
    }

    updateDoorsUI();

    // ----------------------------------------------------------------------
    // 6. MASTER 25°C HVAC PRESET ("Tüm Evi 25°C Yap")
    // ----------------------------------------------------------------------
    if (btnTarget25) {
        btnTarget25.addEventListener('click', () => {
            state.avgTemp = 25.0;
            if (statAvgTemp) statAvgTemp.textContent = '25.0°C';

            // Update HVAC UI indicators
            const ufElem = document.getElementById('hvac-underfloor');
            const acElem = document.getElementById('hvac-ac');
            const radElem = document.getElementById('hvac-radiator');

            if (ufElem) ufElem.textContent = 'Aktif (%85 Güç PID)';
            if (acElem) acElem.textContent = 'Inverter Klima (25°C Eko)';
            if (radElem) radElem.textContent = 'Bölgesel Petek (Devrede)';

            addAiMessage('Sistem 3\'lü iklimlendirmeyi (Alttan Isıtma + Klima + Kalorifer) senkronize etti. Ev sıcaklığı tam 25.0°C hedefine ulaştırıldı.');
            addAiRecommendation('3\'lü HVAC Senkronizasyonu: Alttan ısıtma taban sıcaklığını korurken, Inverter klima havayı 25°C\'ye hızlı şekilde dengeledi.');
        });
    }

    // ----------------------------------------------------------------------
    // 7. "EVE GELDİM" WELCOME HOME TRIGGER (ALEXA-STYLE MACRO)
    // ----------------------------------------------------------------------
    if (btnWelcomeHome) {
        btnWelcomeHome.addEventListener('click', () => {
            // 1. Open doors
            Object.keys(state.doors).forEach(k => state.doors[k] = true);
            updateDoorsUI();

            // 2. Set HVAC 25C
            state.avgTemp = 25.0;
            if (statAvgTemp) statAvgTemp.textContent = '25.0°C';

            // 3. Start music
            state.isPlayingMusic = true;
            updateMusicUI();

            addAiMessage('✨ HOŞ GELDİNİZ! Evinize girmenizle birlikte motorlu kapılar açıldı, sirkadiyen ışıklar %60 seviyesine ayarlandı, ev 25°C\'ye getirildi ve dinlendirici müzik başlatıldı.');
            addAiRecommendation('Karşılama Otonomisi: Antre hareket ve giriş kimlik doğrulaması tamamlandı. Hoş geldiniz!');
        });
    }

    // ----------------------------------------------------------------------
    // 8. HALLWAY MOTION DETECTOR
    // ----------------------------------------------------------------------
    if (btnSimMotion) {
        btnSimMotion.addEventListener('click', () => {
            state.motionDetected = true;
            const sensorElem = document.getElementById('sensor-hallway-status');
            const pulseElem = document.getElementById('pin-hallway-pulse');
            
            if (sensorElem) {
                sensorElem.textContent = 'HAREKET ALGINLANDI! (Gece LED %5)';
                sensorElem.className = 'amber';
            }

            addAiMessage('👣 Koridorda hareket algılandı. Gece göz almayan süpürgelik rehber LED\'leri otonom yakıldı.');
            addAiRecommendation('Koridor Sensörü: Gece modunda hareket algılandı. Düşme önleyici rehber ışıklar aktif.');

            setTimeout(() => {
                state.motionDetected = false;
                if (sensorElem) {
                    sensorElem.textContent = 'BEKLEMEDE (Hareket Yok)';
                    sensorElem.className = 'emerald';
                }
            }, 5000);
        });
    }

    // ----------------------------------------------------------------------
    // 9. SMART MUSIC PLAYER LOGIC
    // ----------------------------------------------------------------------
    function updateMusicUI() {
        const track = state.tracks[state.currentTrackIndex];
        if (currentTrackName) currentTrackName.textContent = track.name;
        
        if (musicIcon) {
            musicIcon.setAttribute('data-lucide', state.isPlayingMusic ? 'pause' : 'play');
            if (window.lucide) lucide.createIcons();
        }
    }

    if (btnToggleMusic) {
        btnToggleMusic.addEventListener('click', () => {
            state.isPlayingMusic = !state.isPlayingMusic;
            updateMusicUI();
            addAiRecommendation(`Müzik Sistemi: ${state.isPlayingMusic ? 'Çalıyor (' + state.tracks[state.currentTrackIndex].name + ')' : 'Duraklatıldı'}.`);
        });
    }

    if (btnNextTrack) {
        btnNextTrack.addEventListener('click', () => {
            state.currentTrackIndex = (state.currentTrackIndex + 1) % state.tracks.length;
            updateMusicUI();
        });
    }

    if (btnPrevTrack) {
        btnPrevTrack.addEventListener('click', () => {
            state.currentTrackIndex = (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;
            updateMusicUI();
        });
    }

    // ----------------------------------------------------------------------
    // 10. LOCAL AI ADVISOR CHAT INTERACTION
    // ----------------------------------------------------------------------
    function addAiMessage(text, isUser = false) {
        if (!chatMessages) return;

        const div = document.createElement('div');
        div.className = `chat-msg ${isUser ? 'user' : 'ai'}`;
        div.innerHTML = `
            <span class="sender">${isUser ? 'Siz:' : 'AURA Yerel AI:'}</span>
            <p>${text}</p>
        `;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addAiRecommendation(text) {
        const listElem = document.getElementById('ai-recommendations');
        if (!listElem) return;

        const card = document.createElement('div');
        card.className = 'ai-recommend-card';
        card.innerHTML = `
            <div class="icon cyan"><i data-lucide="sparkles"></i></div>
            <div class="content">
                <strong>Otonom AI Tavsiyesi:</strong>
                <p>${text}</p>
            </div>
        `;
        listElem.insertBefore(card, listElem.firstChild);
        if (window.lucide) lucide.createIcons();
    }

    if (btnSendChat && chatInput) {
        const handleSend = () => {
            const query = chatInput.value.trim();
            if (!query) return;

            addAiMessage(query, true);
            chatInput.value = '';

            // Respond based on query
            const q = query.toLowerCase();
            setTimeout(() => {
                if (q.includes('25') || q.includes('sıcaklık') || q.includes('ısı')) {
                    state.avgTemp = 25.0;
                    if (statAvgTemp) statAvgTemp.textContent = '25.0°C';
                    addAiMessage('Evdeki 3\'lü iklimlendirme sistemini devreye sokarak tüm odaların sıcaklığını 25.0°C seviyesine getirdim.');
                } else if (q.includes('eve geldim') || q.includes('hoşgeldin')) {
                    if (btnWelcomeHome) btnWelcomeHome.click();
                } else if (q.includes('su') || q.includes('gri su') || q.includes('arıtma')) {
                    addAiMessage(`Bugün toplam ${state.water.recycledTotal} Litre gri ve yarı-gri su geri dönüştürüldü. Su geri dönüşüm verimliliğiniz %${state.water.efficiency}!`);
                } else if (q.includes('müzik') || q.includes('şarkı')) {
                    state.isPlayingMusic = true;
                    updateMusicUI();
                    addAiMessage('Akıllı müzik sistemi başlatıldı. Çalınan parça: ' + state.tracks[state.currentTrackIndex].name);
                } else if (q.includes('kapı') || q.includes('kilit')) {
                    Object.keys(state.doors).forEach(k => state.doors[k] = false);
                    updateDoorsUI();
                    addAiMessage('Güvenlik önceliğiyle tüm motorlu kapılar kilitlendi.');
                } else {
                    addAiMessage(`"${query}" komutunu aldım. Ev içi yerel sunucu mikro-servisleri üzerinden optimizasyon sağlandı.`);
                }
            }, 600);
        };

        btnSendChat.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    // ----------------------------------------------------------------------
    // 11. CHARTS RENDERING (WATER DOUGHNUT & ENERGY BAR)
    // ----------------------------------------------------------------------
    // Water Doughnut Chart
    const waterCtx = document.getElementById('waterDoughnutChart');
    if (waterCtx) {
        new Chart(waterCtx, {
            type: 'doughnut',
            data: {
                labels: ['Gri Su (Duş/Lavabo)', 'Yarı-Gri Su (Makine)', 'Şebeke Musluk Suyu'],
                datasets: [{
                    data: [145, 98, 243],
                    backgroundColor: ['#06b6d4', '#a855f7', '#64748b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#94a3b8', font: { family: 'Outfit' } } }
                }
            }
        });
    }

    // Energy Bar Chart
    const energyCtx = document.getElementById('energyBarChart');
    if (energyCtx) {
        new Chart(energyCtx, {
            type: 'bar',
            data: {
                labels: ['Alttan Isıtma', 'Inverter Klima', 'Ev Sunucusu', 'Aydınlatma & Motorlar', 'Su Pompa/Filtre'],
                datasets: [{
                    label: 'Güç Tüketimi (Watt)',
                    data: [650, 420, 180, 110, 60],
                    backgroundColor: ['#a855f7', '#06b6d4', '#6366f1', '#f59e0b', '#10b981'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { ticks: { color: '#64748b' }, grid: { display: false } },
                    y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
                }
            }
        });
    }
});
