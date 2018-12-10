function playSong(link) {
    var audioPlayer = document.getElementsByTagName('audio')[0];
    audioPlayer.src = link;
    audioPlayer.play();
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var arraySongs = JSON.parse(xhr.responseText);
        var htmlContent = ' ';
        for (var i = 0; i < arraySongs.length; i++) {
            var song = arraySongs[i];
            htmlContent += '<div class="song-item">';
            htmlContent += '<div class="song-index">' + (i+1) + '</div>';
            htmlContent += '<div class="song-thumbnail">';
            htmlContent += '<img src="' + song.thumbnail + '">';
            htmlContent += '</div>';
            htmlContent += '<div class="song-infor">';
            htmlContent += '<div class="song-name">' + song.name + '</div>';
            htmlContent += '<div class="song-singer">' + song.singer + '</div>';
            htmlContent += '<div class="song-author">' + song.author + '</div>';
            htmlContent += '</div>';
            htmlContent += '<div class="song-control" onclick="playSong(\'' + song.link + '\')"><i class="far fa-play-circle"></i></div>';
            htmlContent += '<div class="song-control"><i class="fas fa-info-circle"></i></div>';
            htmlContent += '</div>';
        }
        document.getElementById('list-song').innerHTML += htmlContent;
    }
};
xhr.open('GET', 'https://2-dot-backup-server-001.appspot.com/_api/v2/songs/get-free-songs', true);
xhr.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('token-key'));
xhr.send();
