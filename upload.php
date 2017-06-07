<?php
	$phpFileUploadErrors = array(
	    0 => 'There is no error, the file uploaded with success',
	    1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
	    2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
	    3 => 'The uploaded file was only partially uploaded',
	    4 => 'No file was uploaded',
	    6 => 'Missing a temporary folder',
	    7 => 'Failed to write file to disk.',
	    8 => 'A PHP extension stopped the file upload.',
	);


	$target_dir = "uploads/";
	$count = count($_FILES['uploads']['name']);
	for ($i = 0; $i < $count; $i++) {
	    //echo 'Name: '.$_FILES['uploads']['name'][$i].'<br/>';
	    $target_file = $target_dir . basename($_FILES["uploads"]["name"][$i]);
	    if(!file_exists($target_file)){
	    	move_uploaded_file($_FILES["uploads"]["tmp_name"][$i], $target_file);
	    }
	}

	$allOk = 0;
	for ($i = 0; $i < $count; $i++) {
	    echo $phpFileUploadErrors[$_FILES['uploads']['error'][$i]].'<br/>';
	    $allOk +=$_FILES['uploads']['error'][$i];
	}

	$real_filename = $_REQUEST['filename'];
	$total_chunk_number = $_REQUEST['_chunkTotal'];
	$current_chunk_number = $_REQUEST['_chunkNumber'];
	if (!$allOk && $current_chunk_number == 0) {
        // reassemble the partial pieces to a whole file
        for ($i = 0; $i <= $total_chunk_number; $i ++) {
        	$target_filename = $target_dir . $real_filename . '.part' . $i;
        	if(file_exists($target_filename)){
        		if(filesize($target_filename) >0){
        			$content = file_get_contents($target_filename);
            		file_put_contents($target_dir . $real_filename, $content, FILE_APPEND);
        		}
            	unlink($target_dir . $real_filename . '.part' . $i);
        	}
        }
	}
?>