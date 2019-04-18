
var storage = firebase.storage();
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
fileButton.addEventListener('change', function(e) {
    var file = e.target.files[0]; // retrieves file

    var storageRef = storage.ref('data/' + file.name); // Creates a storage reference
    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
        // updates progress bar
        function progress(snapshot){
            var percentage = (snapshot.bytesTransferred /
                            snapshot.totalBytes) * 100
            uploader.value = percentage;
        },
        function error(err) {

        },
        function complete() {

        }
    )

});
// Install gsutil @ https://cloud.google.com/storage/docs/gsutil_install
// run gsutil cors set cors.json gs://dataviz-adf9c.appspot.com on cmd prompt in folder

// ref('folderName/fileName') format
var storageRef = storage.ref('data/test.csv');
var download = storageRef.getDownloadURL().then(function(url) {
    d3.csv(url, function(d){console.log(d);})
}).catch(function(error) {
    //error code
});