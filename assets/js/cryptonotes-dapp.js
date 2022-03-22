
function loadCounts(){
	return;
}

function loadAccountInfo(){
	if(isConnected){
		_cryptonotes.methods.isUserRegistered(account).call()
		.then(resIsUser => {
			//
			if(resIsUser){

				_cryptonotes.methods.getUserInfo(account).call()
				.then(resUi => {
					//console.log(resUi);
					$('#myWalletAddr').val(account);
					$('#txMyNickname').val(resUi.nickName);
					$('#txMyNickname').attr('placeholder', 'Enter your nickname');
					$('#myTotalNotes').val(resUi.totalNotes);
				})
				.catch(error => {
					__toast(true,'Error',error.message,5000);
				});
			}else{
				// TODO: Crear cuenta
				$('#myWalletAddr').val('');
				$('#txMyNickname').val('');
				$('#txMyNickname').attr('placeholder', 'Connect your wallet to see this info');
				$('#myTotalNotes').val('');
				__toast(true,'Error','User is not registered.',3000);
				$('#manage-account-card').remove();
				$('#account-tab').remove();
			}
			//
		})
		.catch(error => {
			alert(error.message);
		});
	}else{
		console.log('no conectao');
	}
}

function doCryptonotes(){
	const btnCreateNote = document.getElementById('btnCreateNote');
	const btnGetNote = document.getElementById('btnGetNote');
	const btnChangeNick = document.getElementById('btnChangeNickname');

	btnCreateNote.addEventListener('click', async() => {
		form = document.getElementById('frmCreateNote');
		if(form.checkValidity() === true){
			form.classList.remove('was-validated');
			if(isConnected){
				// Verifica que nuevas notas estén habilitadas
				_cryptonotes.methods.newNotesEnabled().call({from: account})
				.then(resEnabled => {
					//
					if(resEnabled){
						console.log('conectado');
						$('#lbl-dialog').removeClass('d-none');
						$('#tx-fail').addClass('d-none');
						$('#close-modal-tx').addClass('d-none');
						$('#tx-confirmed').addClass('d-none');

						$('#modal-tx-wait').modal('show');
						const tx_title = document.getElementById('txTitle');
						const txTitle = tx_title.value;

						const tx_body = document.getElementById('txBody');
						const txBody = tx_body.value;

						_cryptonotes.methods.createNote(txTitle, txBody).send({from: account})
						.then(res => {
							$('#lbl-dialog').addClass('d-none');
							$('#note-id').text('Note ID: ' + res.events.NoteCreated.returnValues.idNote);
							$('#view-tx').attr('href', chainExplorerPrefix+'tx/'+res.transactionHash);
							$('#note-title').text(res.events.NoteCreated.returnValues.title);
							$('#tx-confirmed').removeClass('d-none');
							$('#close-modal-tx').removeClass('d-none');
							$('#txTitle').val('');
							$('#txBody').val('');
							$('#permalink-note').attr('href', permalinkPrefix + res.events.NoteCreated.returnValues.idNote);
							$('#permalink-note').text('Permalink: ' + permalinkPrefix + res.events.NoteCreated.returnValues.idNote);
							
						})
						.catch(error => {
							__toast(true,'Error',error.message,5000);
							$('#lbl-dialog').addClass('d-none');
							$('#tx-fail').removeClass('d-none');
							$('#close-modal-tx').removeClass('d-none');
							$('#txTitle').val('');
							$('#txBody').val('');
						});
					}else{
						alert('Create new notes is not allowed');
						__toast(true,'Error','Create notes is not allowed at this time ((',5000);
					}
					//
				})
				.catch(error => {
					alert(error.message);
				});
			}else{
				__toast(true,"Error","You must connect your wallet before");
			}
		}else{
			form.classList.add('was-validated');
		}
	});


	btnGetNote.addEventListener('click', async() => {
		if(isConnected){
			
			const idNote = parseInt(document.getElementById('txIdNote').value);

			if(idNote >=0){
				$('#modal-loader').modal('show');
				_cryptonotes.methods.getNote(idNote).call({from: account})
				.then(res => {
					//console.log(res);
					var encodedBody = res.noteBody.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
						return '&#' + i.charCodeAt(0) + ';';
					  });
					$('#nTitle').html(res.title);
					$('#nAuthor').html('<strong><span class="fa fa-user"></span></strong> '+res.nickName+'');
					$('#nBody').html(encodedBody);
					$('#nDayz').html('<strong><span class="fa fa-clock"></span></strong> '+tsDiff(res.createdAt)+'');
					$('#nPermalink').html('<strong><span class="fa fa-link"></span></strong> '+permalinkPrefix+res.noteId);
					$('#retrievedNote').removeClass('d-none');
					$('#get-note-error').addClass('d-none');
					$('#modal-loader').modal('hide');
				})
				.catch(error => {
					// console.log(error.message);
					$('#nTitle').html();
					$('#nAuthor').html();
					$('#nBody').html();
					$('#nDayz').html();
					$('#retrievedNote').addClass('d-none');
					$('#debugInfo').html(error.message);
					$('#get-note-error').removeClass('d-none');
					__toast(true,'Error',error.message,5000);
					$('#modal-loader').modal('hide');

				});
			}else{
				alert('Enter a valid Note ID');
			}

		}else{
			__toast(true,"Error","You must connect your wallet before");
		}
	});

	btnChangeNick.addEventListener('click', async() => {
		form = document.getElementById('frmChangeNick');
		if(form.checkValidity() === true){
			form.classList.remove('was-validated');
			if(isConnected){
				// Verifica que el user esté registrado
				_cryptonotes.methods.isUserRegistered(account).call()
				.then(resUr => {
					//
					if(resUr){
						$('#modal-tx-wait').modal('show');
						const tx_new_nick = document.getElementById('txMyNickname').value;

						_cryptonotes.methods.changeNickName(tx_new_nick).send({from: account})
						.then(res => {
							//console.log(res);
							$('#modal-tx-wait').modal('hide');
						})
						.catch(error => {
							$('#modal-tx-wait').modal('hide');
							__toast(true,'Error',error.message,5000);
						});
					}else{
						__toast(true,'Error','User not registered',5000);
					}
					//
				})
				.catch(error => {
					$('#modal-tx-wait').modal('hide');
					alert(error.message);
				});
			}else{
				__toast(true,"Error","You must connect your wallet before");
			}
		}else{
			form.classList.add('was-validated');
		}
	});

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
		const btnConnectWallet = document.getElementById('wConnect');
		const btnDisconnectWallet = document.getElementById('wDisconnect');

		btnConnectWallet.classList.remove('d-none');
		btnConnectWallet.addEventListener('click', async() => {
			const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
			account = accounts[0];

			btnDisconnectWallet.classList.remove('d-none');
			$('#wDisconnect').text(account);
			btnConnectWallet.classList.add('d-none');
			isConnected = true;
			loadAccountInfo();

		});

		btnDisconnectWallet.addEventListener('click', async() => {
			location.reload();
		});

		detectChangeAccount();

		detectChainChanged();

		loadCryptonotesContract();

		doCryptonotes();


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
	$('#tx-caddress').text(contractAddress);

	$('#chkManifest').on('click', function(){
		$('#btnCreateNote').attr('disabled', !$('#chkManifest').is(":checked"));
	});

}


window.onload = init();