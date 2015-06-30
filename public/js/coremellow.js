// coremellow.js

	// Prendo l'elemento da un determinato id
	$id = function(id) {
		return document.getElementById(id);
	}
	
	// Visualizzo output
	Log = function(msg) {
		var m = $id("messages");
		m.innerHTML = msg;
	}

	// Main
	var hashmellow = {
		
		/*
			hashmellow.existsFile() 
			
			Restituisce vero se l'url passato è già un file salvato nel DB
			Restituisce falso se l'url passato non è un file ( quindi nuovo hash )
		*/
		existsFile : function() {
			return window.document.location.hash != ""
		},
		
		// decodifico dalla base64 l'id del file
		fileurl : atob(window.document.location.hash.substring(1)),
		
		// Main del programma
		initialize: function() {
			this.fileselect = $id("fileselect");
			this.filedrag = $id("filedrag");
			this.submitbutton = $id("submitbutton");
			
			
			this.fileselect.addEventListener("change", FileSelectHandler, false);
			
			// Creo il modulo AJAX
			var xhr = new XMLHttpRequest();
			
			// Se supporta upload di file, attivo la selezione dei file
			if ( xhr.upload ) {
				filedrag.addEventListener("dragover", FileDragHover, false);
				filedrag.addEventListener("dragleave", FileDragHover, false);
				filedrag.addEventListener("drop", FileSelectHandler, false);
				filedrag.style.display = "block";
			}
		},
		
		initAsFile: function() {
			$("#urlzone").hide();
			$("#messages").show('slow');
			document.getElementById('submitGhea').innerHTML = "Controlla";
		},
		
		initAsNew: function() {
			$("#messages").hide();
		}
	};

	// Manager del file
	FileSelectHandler = function(e) {
		
		// Cancello file precedenti 
		FileDragHover(e);

		// Salvo i file selezionati nella variabile files
		var files = e.target.files || e.dataTransfer.files;

		// Elaboro il file
		ParseFile(files[0]);

	}

	FileDragHover = function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	function ParseFile(file) {
		$("#ehiwait").show();
		if ( file.size > 200000000 ) {
			$("#ehiwait").hide();
			$("#ehierror").show();
			setTimeout(function() {
				$("#ehierror").hide();
			}, 5000);
			return false;
		}
			
		var r = new Rusha();
		var reader = new FileReader();
		var bfile = new ArrayBuffer();
		
		reader.onload = function(e) {  
			bfile = e.target.result;
			var ss = r.digestFromArrayBuffer(bfile);
			$("#ehiwait").hide();
			if ( !hashmellow.existsFile() ) {
				$('#nome').val(file.name);
				$('#tipo').val(file.type);
				$('#dimensione').val(file.size);
				
				$('#sha1').val(ss);
				$("#messages").show("slow");
				Log(
					"<center><table class='u-full-width'>"+
						  "<thead>"+
							"<tr>"+
							  "<th>Nome</th>"+
							  "<th>Tipo</th>"+
							  "<th>Dimensione</th>"+
							  "<th>Sha1</th>"+
							"</tr>"+
						  "</thead>"+
						  "<tbody>"+
							"<tr>"+
							 " <td> " + file.name + " </td>"+
							  "<td> " + file.type + " </td>"+
							  "<td> " + file.size + " bytes</td>"+
							  "<td> " + ss + "</td>"+
							"</tr>"+
						  "</tbody>"+
						"</table></center>"
				);
			} else {
				if ( ss == $('#sha1').val()) {
					document.getElementById('submitGhea').style.color = "#00FF00";
					document.getElementById('submitGhea').style.border = "1px solid #00FF00";
					Log('Il file e\' verificato');
				} else {
					document.getElementById('submitGhea').style.color = "red";
					document.getElementById('submitGhea').style.border = "1px solid red";
					Log('Il file <strong>NON</strong> e\' verificato');
				}
			}
		}
			
		reader.readAsArrayBuffer(file);
	}

	
	/*
		filterInt(string)
		Restituisce l'intero scritto nella stringa,
		se la stringa non è un intero, restituisce
		NaN ( Non definito ).
		-------------------------------------------
		Esempio:
		filterInt("5") = 5
	*/
	filterInt = function (value) {
		if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
			return Number(value);
		return NaN;
	}
