// Obtener el # de users y # de notas
function loadCounts(){
	
	_cryptonotes.methods.countNotes().call().then(res => {			
		console.log("Cryptonotes: " + res + " pastes created");
		$('#nuNotes').text(res);
	})
	.catch(error => {
		console.log(error);
	});

	_cryptonotes.methods.countUsers().call().then(res => {
		console.log("Cryptonotes: " + res + " users created");
		$('#nuWallets').text(res);
	})
	.catch(error => {
		console.log(error);
	});

}


function loadAccountInfo(){
	return;
}


// Ultimas notas
function getUltimas(){
	_cryptonotes.methods.getLatestNotes().call().then(res => {
		u = parseInt(res._last);
		p = parseInt(res._first);
		x=  u-p;
		for(n=x; n>=0;n--){
			laNota = res.latestNoteZ[n];
			console.log(laNota);
			try{
				append_ = '<div class="col-12 col-sm-6 col-lg-4">';
				append_ += '<div class="card shadow mb-4">';
				append_ += '<div class="card-body">';
				append_ += '<h4>'+laNota.noteTitle+'</h4>';
				append_ += '<p class="text-muted"><small><i class="icon solid fa-user-alt"> </i>'+laNota.created_by+'<br />';
				append_ += '<i class="icon solid fa-clock"> </i> '+tsDiff(laNota.created_at)+'</small></p>';
				append_ += '<hr />';
				append_ += '<div class="text-center"><a class="btn btn-outline-info" target="_blank" href="'+permalinkPrefix+laNota.noteId+'">View note</a></div>';
				append_ += '</div>';
				append_ += '</div>';
				append_ += '</div>';
			}catch(e){
				//console.log(e);
				append_ = '<div class="col-12 col-sm-6 col-lg-4">';
				append_ += '<div class="card shadow mb-4">';
				append_ += '<div class="card-body alert alert-danger">';
				append_ += '<p>Unable to decode input data</p>';
				append_ += '<hr />';
				append_ += '</div>';
				append_ += '</div>';
				append_ += '</div>';
			}finally{
				$('#l-notes').append(append_);
			}
		}
		
	})
	.catch(error => {
		console.log(error);
	});


}


function init(){
    if(typeof window.ethereum !== 'undefined'){
		loadCryptonotesContract();

		detectChainChanged();

		getUltimas();
    }else{
		console.log('Metamask not installed');
		$('.contract-info').addClass('dd-none');
		$('#ultimas').addClass('dd-none');
		__toast(true,'Error','Metamask is not installed',10000);
		content = '<div class="row">'
		content += '<div class="col-12 col-md-3"><img src="https://underdog1987.keybase.pub/cryptonotes/images/metamask-logo.svg" alt="Metamask Logo" class="img-fluid"></div>';
		content += '<div class="col-12 col-md-9">You need install Metamask to use this dApp. Install Metemask and try again.<p class="text-center p-3"><button data-dismiss="modal" class="w-100">OK</button></p></div>'
		content += '<div class="col-12"><hr /></div>'
		content += '<div class="col-12 text-center"><small><a href="https://metamask.io/download/" target=_blank">Download Metamask</a></small></div>'
		content += '</div>';
		$('#modal-content').html(content);
		$('#modal-errores').modal('show');
    }
	$('#bsc-contract').attr('href', chainExplorerPrefix+'address/'+contractAddress);
	$('#tx-caddress').text(contractAddress)
}

window.onload = init();