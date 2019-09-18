freezr.initPageScripts = function() {
	freezr.promise.db.getById("yksiNote",{}).then((response)=>{
		if (response && response.results && response.results.text) document.getElementById('the_text').innerText= response.results.text})
	.catch((e)=>{if (e.message !="no related records") alert("Hmmm - there was an error connecting to your freezr:"+e.message)})

	document.getElementById('save_button').addEventListener('click', function(e) {
		freezr.promise.db.write(
				{"text":document.getElementById('the_text').innerText},{data_object_id:"yksiNote",upsert:true})
			.then((response)=>{ alert(response.success? "YAAY, you saved your yksi note on your freezr" : "Oops - there was an error saving.")})
			.catch((error)=>{ alert("Oops - there was an error connecting to your freezr: "+error.message)})
	}, false);

	document.getElementById('publish_button').addEventListener('click', function(e) {
		freezr.promise.perms.setObjectAccess("publish_note", "yksiNote", {grant:true,shared_with_group:'public'})
			.then((response)=>{
				console.log(response)
				alert(response.error? ("Oops - there was an error pubnlishing"+response.error):"YAAY, you you just published your yksi note")})
			.catch((error)=>{
				console.log(error)
				alert("The note could not be published: "+error.message)})
	}, false);
}
