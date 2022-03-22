const abi = 
[
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "_npe",
				"type": "bool"
			}
		],
		"name": "NewNotesEnabled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "oldNickname",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newNickname",
				"type": "string"
			}
		],
		"name": "NicknameChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "idNote",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "NoteCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "AllowOrDisallowNewNotes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "about",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_nickname",
				"type": "string"
			}
		],
		"name": "changeNickName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "countNotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalNotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "countUserNotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalNotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "countUsers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalUsers",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "createAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_noteTitle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_noteBody",
				"type": "string"
			}
		],
		"name": "createNote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "noteId",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "devWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "devWithdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLatestNotes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "created_by",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "noteTitle",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "created_at",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "noteId",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoNotes.PreviewNote[]",
				"name": "latestNoteZ",
				"type": "tuple[]"
			},
			{
				"internalType": "uint256",
				"name": "_first",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_last",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getNote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "noteId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "noteBody",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nickName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getUserInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "idUser",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "nickName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalNotes",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isUser",
						"type": "bool"
					}
				],
				"internalType": "struct CryptoNotes.User",
				"name": "user",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "isUserRegistered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "RegisteredUser",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "newNotesEnabled",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newDevWallet",
				"type": "address"
			}
		],
		"name": "setDevWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]
;

const ENV = 'prod';
const contractAddress = ENV == 'prod' ? '0x68d36D43b8a55B16E35fc517c987Bd171b59E662' :'0xe28988eE67C26055C4A1296A9D89Fae0B1946BA1';
const chainExplorerPrefix = ENV == 'prod' ? 'https://bscscan.com/':'https://testnet.bscscan.com/';
const bscChain = ENV == 'prod' ? 56:97;
const bscNetName = ENV == 'prod' ? 'Binance Smart Chain':'Binance Smart Chain Testnet';
const permalinkPrefix = 'https://underdog1987.keybase.pub/cryptonotes/note.html?n=';

let web3;
let account;
let _cryptonotes;
var isConnected = false;
var btnConnectWallet;
var btnDisconnectWallet;

window.__toast = function (error,title,msj,tim=3500){
    var msgClass = error==true?"alert-danger":"alert-success";
    var msgHTML = '<div class="alertaActivacion alert msj_js '+msgClass+'">';
    msgHTML += '<strong style="font-size:16px;">'+title+'</strong>';
    msgHTML += '<p id="mensaje" style="font-size:14px;">'+msj+'</p>';
    msgHTML += '</div>';
    $("body").append(msgHTML);
    $(".msj_js").show();
    setTimeout(function(){
      $(".msj_js").remove();
    }, tim);
}

function loadCryptonotesContract(){
    
	web3 = new Web3(window.ethereum);
	_cryptonotes = new web3.eth.Contract(abi, contractAddress);
	web3.eth.getChainId().then((chainID) => {
		if(chainID !== bscChain){
            content = '<div class="row">'
            content += '<div class="col-12 col-md-3"><img src="https://underdog1987.keybase.pub/cryptonotes/images/metamask-binance.png" alt="Metamask and Binance logos" class="img-fluid"></div>';
            content += '<div class="col-12 col-md-9"><p>This dApp uses '+bscNetName+', but you are no connected to it.</p><p>Add/Change the network and try again.</p></div>'
            content += '<div class="col-12"><hr /></div>'
            content += '<div class="col-12 text-center"><small><a href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" target=_blank">Binance Smart Chain Documentation</a></small></div>'
            content += '</div>';
            $('#modal-content').html(content);
            $('#modal-errores').modal('show');
		}else{
            $('#modal-errores').modal('hide');
			loadCounts();
      loadAccountInfo();
		}
	});
}

function detectChainChanged(){
	window.ethereum.on('chainChanged', (_chainId) => {
		console.log(_chainId);
		loadCryptonotesContract();

	});
}

function tsDiff(ts){

  MINUTE = 1 * 60;
  HOUR = MINUTE * 60;
  DAY = HOUR * 24;
  YEAR = DAY * 365;

  nau = parseInt(Date.now() / 1000);

  yearsAgo = parseInt((nau - ts) / YEAR);
  daysAgo = parseInt((nau - ts) / DAY);
  hoursAgo = parseInt((nau - ts) / HOUR);
  minutesAgo = parseInt((nau - ts) / MINUTE);

  if( yearsAgo > 0){
    ret = yearsAgo + " year(s) ago";
  }else if( daysAgo > 0){
    ret = daysAgo + " day(s) ago";
  }else if(hoursAgo > 0){
    ret = hoursAgo + " hour(s) ago";
  }else if(minutesAgo > 0){
    ret = minutesAgo + " minutes(s) ago";
  }else{
    ret = "Less than a minute ago";
  }

  return ret;

}
