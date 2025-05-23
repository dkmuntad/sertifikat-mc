document.querySelector('.rotate-card').addEventListener('click', function() {
    this.classList.toggle('rotate');
  });
  const linkElement = document.getElementById("linkSertifikat");
  const linkElement2 = document.getElementById("linkSertifikat2");

  // Mendapatkan URL aktif saat ini
  const currentUrl = window.location.href;
  const currentUrl2 = window.location.href;

  // Menetapkan URL sebagai teks dan href dari link
  linkElement.href = currentUrl;
  linkElement.textContent = currentUrl;
  linkElement2.href = currentUrl2;
  linkElement2.textContent = currentUrl2;


    // const spreadsheetId = '15vJQlKGQOvFRv0A_SniNIuTXvomNYxzuYk2bN7NJzuc';
    // const range = 'Sheet1!A2:D';
    // const apiKey = 'AIzaSyBv9Ny9JnFxu6YMU5UYpAFqzrreApzwYEU'; // Gantilah dengan API Key Anda
    
    // const namaDiHtml = document.querySelector('.name-sertifikat').innerText; // Ambil nama dari HTML
    
    // fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`)
    // .then(response => response.json())
    // .then(data => {
    //   const rows = data.values;
    //   let tableContent = '';
    //   let totalNilai = 0;
    //   let jumlahJobDesk = 0;
  
    //   // Filter data berdasarkan nama yang sama dengan nama di HTML
    //   const filteredRows = rows.filter(row => row[1].toLowerCase() === namaDiHtml.toLowerCase());
  
    //   // Jika ada data yang cocok
    //   if (filteredRows.length > 0) {
    //     filteredRows.forEach((row, index) => {
    //       const nilai = parseFloat(row[3]); // Ambil nilai dari kolom nilai
    //       totalNilai += nilai; // Tambahkan nilai ke total
    //       jumlahJobDesk += 1; // Hitung jumlah job desk
  
    //       tableContent += `
    //         <tr>
    //           <td>${index + 1}</td>
    //           <td>${row[2]}</td>
    //           <td>${nilai}</td>
    //         </tr>
    //       `;
    //     });
  
    //     // Hitung rata-rata nilai
    //     const rataRata = (totalNilai / jumlahJobDesk).toFixed(2);
  
    //     // Tambahkan baris untuk rata-rata di akhir tabel
    //     tableContent += `
    //       <tr>
    //         <th colspan="2">Rata-rata</th>
    //         <th>${rataRata}</th>
    //       </tr>
    //     `;
    //   } else {
    //     tableContent = '<tr><td colspan="3">Data tidak ditemukan</td></tr>';
    //   }
  
    //   // Masukkan hasil ke tabel
    //   document.querySelector('.data-sertifikat tbody').innerHTML = tableContent;
    // })
    // .catch(error => console.error('Error fetching data: ', error));

    const spreadsheetId = '1PU79lG9ayzPMaVvFsbNWevgE8vViInBGGNEzgNiRBOY';
    const range = 'Sheet4!A2:Z';
    const apiKey = 'AIzaSyBv9Ny9JnFxu6YMU5UYpAFqzrreApzwYEU'; // Gantilah dengan API Key Anda
    
    // Ambil ID dari URL (misal: 'P-HKI-24-1-001')
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id'); // pastikan URL berisi parameter id
    
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const rows = data.values;
        let tableContent = '';
        let totalNilai = 0.00;
        let jumlahJobDesk = 0;
    
        // Filter data berdasarkan ID dari URL
        const filteredRows = rows.filter(row => row[0] === idFromUrl);
    
        // Jika ada data yang cocok
        if (filteredRows.length > 0) {
          const namaLengkap = filteredRows[0][1]; // Ambil nama dari kolom Nama Lengkap
          document.querySelector('.name-sertifikat').innerText = namaLengkap; // Tampilkan nama pada HTML
          
          filteredRows.forEach((row, index) => {
            const nilai = parseFloat(row[3]); // Ambil nilai dari kolom Nilai
            totalNilai += nilai; // Tambahkan nilai ke total
            jumlahJobDesk += 1; // Hitung jumlah job desk
    
            tableContent += `
              <tr>
                <td>${index + 1}</td>
                <td>${row[2]}</td>
                <td>${row[4]}</td>
              </tr>
            `;
          });
    
          // Hitung rata-rata nilai
          const rataRata = (totalNilai / jumlahJobDesk).toFixed(2);
          let predikat;
          if (rataRata >= 85.01) {
            predikat = "A";
          } else if (rataRata >= 80.01) {
            predikat = "A-";
          } else if (rataRata >= 75.01) {
            predikat = "B+";
          } else if (rataRata >= 70.01) {
            predikat = "B";
          } else if (rataRata >= 65.01) {
            predikat = "B-";
          } else if (rataRata >= 50.01) {
            predikat = "C";
          } else if (rataRata >= 45.01) {
            predikat = "D";
          } else {
            predikat = "E";
          }
          // Tambahkan baris untuk rata-rata di akhir tabel
          
          tableContent += `
            <tr>
              <th colspan="2">Predikat</th>
              <th>${predikat}</th>
            </tr>
          `;
          // Update elemen predikat di HTML
          document.getElementById("predikat").innerText = predikat;
        } else {
          tableContent = '<tr><td colspan="3">Data tidak ditemukan</td></tr>';
        }
    
        // Masukkan hasil ke tabel
        document.querySelector('.data-sertifikat tbody').innerHTML = tableContent;
      })
      .catch(error => console.error('Error fetching data: ', error));
    

  
      const urlParam = new URLSearchParams(window.location.search);
      const url = urlParam.get('id'); // Ambil parameter URL dari URL
      if (url) {
        const fullUrl = `https://dkmuntad.github.io/sertifikat-mc/?id=${url}`;
        const qrcode = new QRCode(document.getElementById("qrcode"), {
          text: fullUrl,
          width: 128,  // Ukuran QR Code
          height: 128
        });
      }
      

      