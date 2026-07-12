fetch('https://github.com/PranavShende')
  .then(r => r.text())
  .then(html => {
    const regex = /<span class="repo" title="([^"]+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      console.log(match[1]);
    }
    
    // alternative regex for pinned repos:
    const regex2 = /<a[^>]+href="\/PranavShende\/([^"]+)"[^>]*class="[^"]*text-bold[^"]*"[^>]*>/gi;
    while ((match = regex2.exec(html)) !== null) {
        console.log("Found:", match[1]);
    }
  });
