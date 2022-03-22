const baz = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    account = accounts[0];
    console.log("cuenta en baz: " + account);
    btnDisconnectWallet.classList.remove('d-none');
    $('#wDisconnect').text(account);
    btnConnectWallet.classList.add('d-none');
    isConnected = true;

};


function loadCounts(){
	return;
}

function loadAccountInfo(){
    return
}

function doCryptonotes(){
    if(isConnected){
        
        let params = (new URL(document.location)).searchParams;
        let n = params.get("n");
        const idNote = parseInt(n);
        console.log(idNote);

        if(idNote >=0){
            $('#modal-loader').modal('show');
            _cryptonotes.methods.getNote(idNote).call({from: account})
            .then(res => {
                // console.log(res);
                var encodedBody = res.noteBody.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                    return '&#' + i.charCodeAt(0) + ';';
                    });
                $('#individual-note-title').html(res.title);
                $('#individual-note-author').html(res.nickName);
                $('#individual-note-body').html(encodedBody);
                $('#individual-note-createdat').html(tsDiff(res.createdAt));
                $('#individual-note-permalink').html(permalinkPrefix+res.noteId);
                
                $('#get-note-error').addClass('d-none');
                $('#get-note-error').addClass('d-none');
                $('#modal-loader').modal('hide');
                document.title = res.title;
            })
            .catch(error => {
                // console.log(error.message);
                $('#individual-note-title').html();
                $('#individual-note-author').html();
                $('#individual-note-body').html();
                $('#individual-note-createdat').html();
                $('#individual-note-permalink').html();

                $('#debugInfo').html(error.message);
                $('#get-note-error').removeClass('d-none');
                $('#share-note').remove();
                __toast(true,'Error',error.message,5000);
                $('#modal-loader').modal('hide');
                document.title = "Cryptonotes | Paste tools became crypto";

            });
        }else{
            alert('Enter a valid Note ID');
            location.href="dapp.html";
        }

    }else{
        __toast(true,"Error","You must connect your wallet before");
    }

}

function detectChangeAccount(){
	window.ethereum.on('accountsChanged', function(account){
		$('#wConnect').trigger('click');
		__toast(false, "Account changed", "New account connected: "+ account);
	});
}

function init(){
    if(typeof window.ethereum !== 'undefined'){
		// Buttons
		btnConnectWallet = document.getElementById('wConnect');
		btnDisconnectWallet = document.getElementById('wDisconnect');

		btnConnectWallet.classList.remove('d-none');
		btnConnectWallet.addEventListener('click', async() => {
			const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
			account = accounts[0];

			btnDisconnectWallet.classList.remove('d-none');
			$('#wDisconnect').text(account);
			btnConnectWallet.classList.add('d-none');
			isConnected = true;

		});

        baz().then(res =>{
            btnDisconnectWallet.addEventListener('click', async() => {
                location.reload();
            });
    
            detectChangeAccount();
    
            detectChainChanged();
    
            loadCryptonotesContract();
    
            doCryptonotes();
        });




    }else{
		console.log('Metamask not installed');
		__toast(true,'Error','Metamask is not installed',10000);
		content = '<div class="row">'
		content += '<div class="col-12 col-md-3"><img src="https://underdog1987.keybase.pub/cryptonotes/images/metamask-logo.svg" alt="Metamask Logo" class="img-fluid"></div>';
		content += '<div class="col-12 col-md-9">You need install Metamask to use this dApp. Install Metemask and try again.<p class="text-center p-3"></p></div>'
		content += '<div class="col-12"><hr /></div>'
		content += '<div class="col-12 text-center"><small><a href="https://metamask.io/download/" target=_blank">Download Metamask</a></small></div>'
		content += '</div>';
		$('#modal-content').html(content);
		$('#modal-errores').modal('show');
    }

	$('#tx-caddress').text(contractAddress)

}


window.onload = init();