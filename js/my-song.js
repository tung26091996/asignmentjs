var API = "https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-mine"

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var listSong = JSON.parse(this.responseText);
        var content = '';
        for (var i = 0; i < listSong.length ; i++) {
            content += '<div class="song-item">';
            content += '<div class="song-index">' + (i + 1) + '</div>';
            content += '<div class="song-thumbnail">';
            content += '<img src="' + listSong[i].thumbnail + '" alt="">';
            content += '</div>';
            content += '<div class="song-infor">';
            content += '<h1 class="song-name">' + listSong[i].name + '</h1>';
            content += '<div class="song-singer">' + listSong[i].singer + '</div>';
            content += '</div>';
            content += '<div class="song-control" onclick="playSong(\'' + listSong[i].link + '\', \'' + listSong[i].name + '\', \'' + listSong[i].singer + '\')">Play</div>';
            content += '</div>';
        }
        document.getElementById('my-song').innerHTML = content;
    }
}

xhr.open('GET', API, true);
xhr.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('token-key'));
xhr.send();

function playSong(link, name, singer) {
    document.getElementById('my-mp3').src = link;
    document.getElementById('current-play-title').innerHTML = 'Current playing: ' + name + ' - ' + singer;
}