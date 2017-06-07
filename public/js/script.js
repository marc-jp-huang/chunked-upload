$('.upload-btn').on('click', function (){
    $('#fileToUpload').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});
var formDataList = [];
var chunks = 0;
$("#fileToUpload").on("change",function(){
	var file = $(this)[0].files[0];
	var chunkSize = 1024 * 1024 * 2;
	var fileSize = file.size;
	chunks = Math.ceil(file.size/chunkSize,chunkSize);
	var chunk = 0;
	//console.log('file size..',fileSize);
	//console.log('chunks...',chunks);
	while (chunk <= chunks) {
		var formData = new FormData();
		formData.append("filename",file.name);
		formData.append("_chunkTotal",chunks);
		formData.append("_chunkNumber",chunk);
	    var offset = chunk*chunkSize;
	    // console.log('current chunk..', chunk);
	    // console.log('offset...', chunk*chunkSize);
	    // console.log('file blob from offset...', offset)
	    // console.log(file.slice(offset,offset+chunkSize));
	    formData.append('uploads[]', file.slice(offset,offset+chunkSize), file.name+'.part'+chunk);
	    formDataList.push(formData);
	    chunk++;
	}
	uploadFile(formDataList.pop());
});

function uploadFile(formData){
	$.ajax({
      url: 'upload.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
      	if(formDataList.length>0){
      		uploadFile(formDataList.pop());
      	}
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // listen to the 'progress' event https://xhr.spec.whatwg.org/#interface-progressevent
        xhr.upload.addEventListener('progress', function(event) {

          if (event.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = event.loaded / event.total / chunks + (chunks-formDataList.length)/chunks;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }

          }

        }, false);
        return xhr;
      }
    });//end of ajax
}