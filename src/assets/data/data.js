export const data = {
    bride: {
        P: {
            id: 1,
            name: 'Apriefta Alief P.P.',
            child: 'Putri ke 1',
            father: 'Totok Istiyono',
            mother: 'Riefna Khuljanah',
            image: './src/assets/images/cewe1.png'
        },
        L: {
            id: 2,
            name: 'Gallan Stefan J.K.',
            child: 'Putra ke 1',
            father: 'Agus Ibnu Alfan',
            mother: 'Siti Maryam',
            image: './src/assets/images/cowo1.png'
        },

        couple: './src/assets/images/couple1.png',
        couple1: './src/assets/images/couple2.png'
    },

    home: {
        // Background image for the Home section
        background: './src/assets/images/couple4.png',
        // Simple background position controls
        // Use values like 'center', 'left', 'right' or percentages like '50%'
        x: 'center',
        y: 'center',
        // Mobile overrides (optional)
        xMobile: 'center',
        yMobile: 'top'
    },

    time: {
        // Background image for the Waktu & Tempat section
        background: './src/assets/images/couple3.png',
        marriage: {
            year: '2025',
            month: 'Desember',
            date: '28',
            day: 'Minggu',
            hours: {
                start: '09.00',
                finish: '10.00'
            }
        },
        reception: {
            year: '2025',
            month: 'Desember',
            date: '28',
            day: 'Minggu',
            hours: {
                start: '10.00',
                finish: 'Selesai'
            }
        },
        address: 'Bukit Gading Cisoka Blok E5 No.9, RT 003/ RW 005, Desa.Selapajang, Kec.Cisoka, Kab.Tangerang, Banten (15730)'
    },

    link: {
        calendar: 'https://calendar.app.google/3h6QXDJR2GbfNCtR8',
        map: 'https://maps.app.goo.gl/gYCKQhR37tdAf9f58?g_st=aw',
    },

    galeri: [
        {
            id: 1,
            image: './src/assets/images/8.png'
        },
        {
            id: 2,
            image: './src/assets/images/7.png'
        },
        {
            id: 3,
            image: './src/assets/images/6.png'
        },
        {
            id: 4,
            image: './src/assets/images/9.png'
        },
        {
            id: 5,
            image: './src/assets/images/10.png'
        }
    ],

    bank: [
        {
            id: 1,
            name: 'Gallan Stefan Jayakelana',
            icon: './src/assets/images/bca.png',
            rekening: '7111088512'
        },
        {
            id: 2,
            name: 'Apriefta Alief Perma',
            icon: './src/assets/images/mandiri.png',
            rekening: '1630003022848'
        },
    ],

    audio: './src/assets/audio/wedding1.mp3',

    api: 'https://script.google.com/macros/s/AKfycbwZ4KjCqWrJGghwXBmsAqJ1dCByrIhQc0fbCZ-fFipvUL1cDAifjzShStwJsqsCkuqw/exec',

    navbar: [
        {
            id: 1,
            teks: 'Home',
            icon: 'bx bxs-home-heart',
            path: '#home',
        },
        {
            id: 2,
            teks: 'Mempelai',
            icon: 'bx bxs-group',
            path: '#bride',
        },
        {
            id: 3,
            teks: 'Tanggal',
            icon: 'bx bxs-calendar-check',
            path: '#time',
        },
        {
            id: 4,
            teks: 'Galeri',
            icon: 'bx bxs-photo-album',
            path: '#galeri',
        },
        {
            id: 5,
            teks: 'Ucapan',
            icon: 'bx bxs-message-rounded-dots',
            path: '#wishas',
        },
    ],
}
