Dropzone.autoDiscover = false;
var counterVar = 0;
var totalsize = 0.0;
var flag = true;
var sflag1 = true;
var sflag = true;
var Dropzoneflag = true;

$(document).ready(function() {
    myDropzone = new Dropzone("#myDropZone", {
        url: "url",
        thumbnailWidth: 100,
        autoProcessQueue: false,
        thumbnailHeight: 50,
        parallelUploads: 40,
        uploadMultiple: true,
        addRemoveLinks: !0,
        maxFilesize: 20,
        filesizeBase: 1024
    });

    $("#NoteMaxFileContent").html($("#MESSAGE_UPLOAD_FILE_SIZE_NOTE").val());

    myDropzone.on("addedfile", function(file) {
        //myDropzone.processQueue();
        console.log(file.type);

        totalsize += parseFloat((file.size / (1024)).toFixed(2));
        console.log(totalsize);

        if (totalsize >= 102400) {
            this.removeFile(file);
            if (Dropzoneflag == true) {
                alert("Total Max size exceeedded");
                Dropzoneflag = false
            }

        }
        $("#remove").click(function() {
            myDropzone.removeFile(file);
        })
        $("#get").click(function() {

        })
    });

    myDropzone.on("addedfiles", function(files) {


        if (totalsize > 104857600) {
            if (Dropzoneflag == true) {
                alert("Total Max size exceeedded");
                Dropzoneflag = false
            }
        }
        Dropzoneflag = true;
    });

    myDropzone.emit("completemultiple", function(file) {

        console.log(file.length)
        alert("complete")

    });

    myDropzone.emit("complete", function(file) {

        console.log(file.length)
        alert("complete")

    });
    myDropzone.on("success", function(file) {

        console.log(file.length)
        alert("complete")

    });
    myDropzone.on("drop", function(listFiles) {
        Dropzoneflag = true;
    });
    myDropzone.on("error", function(file, message) {
        this.removeFile(file);
        if (Dropzoneflag == true) {
            alert("Max size exceeedded");
            totalsize = 0.0;
            Dropzoneflag = false
        }
    });
    $('#myDropZone').click(function() {
        Dropzoneflag = true;
    });
    myDropzone.on("removedfile", function(file) {
        if (flag)
            var c = 0;
        totalsize -= parseFloat((file.size / (1024)).toFixed(2));
        c++;
        flag = false;
        console.log(totalsize);
    });
    myDropzone.on('sending', function(file, xhr, formData) {
        counterVar++;
        // Append all form inputs to the formData Dropzone will POST
        var data = $('#vendorForm').serializeArray();
        $.each(data, function(key, el) {
            if (counterVar == myDropzone.files.length) {
                formData.append(el.name, el.value);
            }

        });
    });

});