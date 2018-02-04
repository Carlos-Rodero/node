var xhr;

			function inici() {
				try {
					// Firefox, Opera 8.0+, Safari, Chrome
					xhr = new XMLHttpRequest();
				} catch (e) {
					// Internet Explorer
					try {
						xhr = new ActiveXObject("Msxml2.XMLHTTP");
						//ie6+
					} catch (e) {
						try {
							xhr = new ActiveXObject("Microsoft.XMLHTTP");
							//ie5
						} catch (e) {
							alert("El teu navegador no suporta AJAX!");
							return false;
						}
					}
				}
				
				var cell =document.querySelectorAll('.cell');
				for(var i=0;i<cell.length;i++){
					cell[i].addEventListener('click',callback,false);
				}
				function callback(){
					var id = this.id;
					ajaxFunction(id);
					this.setAttribute('class','cell black');
				}
			}

			function ajaxFunction(contingut) {
				console.log(contingut)
				//callback
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						//document.getElementById("cadenaInvertida").innerHTML = xhr.responseText;
						
					}
				};
				
				xhr.open("GET", "taulell?posicio=" + contingut, true);
				xhr.send(null);
			}


			window.addEventListener("load", inici, true);