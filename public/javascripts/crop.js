 
           	   /*function preview(event){
           	   	var image_prev = document.getElementById("img_preview");

           	   	image_prev.src=URL.createObjectURL(event.target.files[0]);
           	   	image_prev.style.height="250px";
           	   	image_prev.onload = function(){
           	   		URL.revokeObjectURL(image_prev.src);
           	   	}
           	   };*/
               var image_canvas = document.getElementById('img_canvas');
			   const image = new Image();
           	   function prev(event){
           	   	  
			       image.src = URL.createObjectURL(event.target.files[0]);
			       console.log('prev called');
			       image.onload = ()=>{
			       	        document.getElementById('image_label').innerHTML = "CROP IMAGE BEFORE UPLOADING";
		           	   	     document.getElementById('image_crop').style.display="block";
		           	   	     document.getElementById('user_current_image').style.display="none";
		           	   	     image_canvas.style.display="none";
				       		console.log('image loaded');
				        	window.image_width = image.naturalWidth;
				        	window.image_height = image.naturalHeight;
				        	var image_aspect = (image_width/image_height);
				        	window.image_to_crop_ratio = (image_height/300);

				        	 frame1 = document.getElementById('image_frame');
				        	 frame1.style.height = '300px';
				        	 image.style.height = "300px";
				        	 var corr_width = image_aspect * 300; 
				             frame1.style.width =corr_width+'px';
				             image.style.width = corr_width+'px';
				             var frame2 = document.getElementById('crop_frame');
				      
				       //crop image
				       //width bigger than height
					       if(image_width>image_height){
					       	 image_width = image_height;
					       	 frame2.style.height = '300px';
                             frame2.style.width = '300px';
                           
					       }
					       else{
					       	image_height = image_width;
					       	frame2.style.height = corr_width+'px';
                            frame2.style.width = corr_width+'px';
					       
					       }


				            frame2.appendChild(image);
					  
			        };
			    
				
			       };
			       function draw_canvas(){
                            
                            image_canvas.style.display="block";
				          	var canvas_width = 300;
					       	var canvas_height = canvas_width *(window.image_height/window.image_width);
					       	console.log(window.image_height);

					       image_canvas.width = canvas_width ;
					       image_canvas.height = canvas_height;
						   var ctx = image_canvas.getContext('2d');

						  // console.log(window.top);
						 
						   //console.log(image_width);
						   var frame2 = document.getElementById('crop_frame');
						   var vertical_position =frame2.getBoundingClientRect().top - image.getBoundingClientRect().top;
						   var horizontal_position = frame2.getBoundingClientRect().left - image.getBoundingClientRect().left;
						   console.log(horizontal_position);
						   console.log(vertical_position);
				           
				           var x_coordinate = horizontal_position* window.image_to_crop_ratio;
				           var y_coordinate = vertical_position * window.image_to_crop_ratio;
				           console.log(y_coordinate);
				           var scrollbar_width = frame2.offsetWidth - frame2.clientWidth;
				           scrollbar_width = (scrollbar_width *2)+ (scrollbar_width/2);
				           console.log("scroll "+scrollbar_width);
				           
						   ctx.drawImage(image,x_coordinate,y_coordinate ,(window.image_width-scrollbar_width) ,(window.image_height-scrollbar_width), 0 ,0,  canvas_width , canvas_height);
						   var cropped_image = image_canvas.toDataURL();
						   console.log(cropped_image);
				           document.getElementById('base64_data').value=cropped_image;
				           document.getElementById('image_crop').style.display="none";
				        };
      