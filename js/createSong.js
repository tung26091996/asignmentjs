var token = localStorage.getItem('token-key');
if(token == null || token.length == 0){
    location.href = 'login.html';
}
var SAVESONG_API = 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs';
var btnsubmit = document.forms['savesong-form']['btn-submit'];
if (btnsubmit != null) {
    btnsubmit.onclick = function () {
        var txtName = document.forms['savesong-form']['Name'];
        var txtSinger = document.forms['savesong-form']['Singer'];
        var txtAuthor = document.forms['savesong-form']['Author'];
        var txtThumbnail = document.forms['savesong-form']['Thumbnail'];
        var txtLink = document.forms['savesong-form']['Link'];
        if (txtName != null && txtSinger != null && txtAuthor != null) {
            var name = txtName.value;
            var singer = txtSinger.value;
            var author = txtAuthor.value;
            var thumbnail = txtThumbnail.value;
            var link = txtLink.value;
            var jsSong = {
                name : name,
                singer : singer,
                author : author,
                thumbnail : thumbnail,
                link : link,
            }
            var jsonData = JSON.stringify(jsSong);
            postSongData(jsonData);
        }
    }
}

function postSongData(jsonData) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var song = JSON.parse(this.responseText);
            alert('Lưu bài hát thành công')
        } else if (this.readyState == 4){
            alert('Khong the luu bai hat!');
        }
    }
    xhr.open('POST',SAVESONG_API,true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('token-key'));
    xhr.send(jsonData);
}
