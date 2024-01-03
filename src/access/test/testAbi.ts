export const abi1 = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "issuerAddress",
          "type": "address"
        }
      ],
      "name": "setIssuer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "issuer",
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
          "internalType": "uint256",
          "name": "lineOfCreditAmount",
          "type": "uint256"
        }
      ],
      "name": "setLineOfCredit",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lineOfCredit",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "postionMove",
          "type": "uint256"
        }
      ],
      "name": "movePlayer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "position",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


export const abi2 = [
    {
        "inputs":[
            {
                "internalType":"address",
                "name":"faceContract",
                "type":"address"
            }
        ],
        "stateMutability":"nonpayable",
        "type":"constructor"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "internalType":"uint64",
                "name":"popularId",
                "type":"uint64"
            }
        ],
        "name":"AddPopular",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "internalType":"uint256",
                "name":"blockNumber",
                "type":"uint256"
            }
        ],
        "name":"EndGame",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "internalType":"uint32",
                "name":"imageId",
                "type":"uint32"
            },
            {
                "indexed":false,
                "internalType":"uint64",
                "name":"popular",
                "type":"uint64"
            }
        ],
        "name":"GetPopular",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "internalType":"uint256",
                "name":"count",
                "type":"uint256"
            }
        ],
        "name":"SendPopular",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":true,
                "internalType":"address",
                "name":"from",
                "type":"address"
            },
            {
                "indexed":true,
                "internalType":"address",
                "name":"to",
                "type":"address"
            },
            {
                "indexed":false,
                "internalType":"uint256",
                "name":"value",
                "type":"uint256"
            }
        ],
        "name":"Transfer",
        "type":"event"
    },
    {
        "inputs":[

        ],
        "name":"_faceContract",
        "outputs":[
            {
                "internalType":"address",
                "name":"",
                "type":"address"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"_init",
        "outputs":[
            {
                "internalType":"uint32",
                "name":"",
                "type":"uint32"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"uint32",
                "name":"imageId",
                "type":"uint32"
            }
        ],
        "name":"addImage",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"addOnePopular",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"uint32",
                "name":"imageId",
                "type":"uint32"
            }
        ],
        "name":"addPopular",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"uint32",
                "name":"imageId",
                "type":"uint32"
            },
            {
                "internalType":"uint64",
                "name":"num",
                "type":"uint64"
            }
        ],
        "name":"addPopularNum",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"creator",
        "outputs":[
            {
                "internalType":"address",
                "name":"",
                "type":"address"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"destroy",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"emit_event_l2",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"address",
                "name":"faceContact",
                "type":"address"
            },
            {
                "internalType":"uint32",
                "name":"imageId",
                "type":"uint32"
            },
            {
                "internalType":"uint64",
                "name":"popularData",
                "type":"uint64"
            }
        ],
        "name":"err_data_destroy",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"uint32",
                "name":"imageId",
                "type":"uint32"
            }
        ],
        "name":"getPopular",
        "outputs":[
            {
                "internalType":"uint64",
                "name":"",
                "type":"uint64"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"getPopularFormNo1",
        "outputs":[
            {
                "internalType":"uint64",
                "name":"",
                "type":"uint64"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"initialization",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"uint32",
                "name":"number",
                "type":"uint32"
            }
        ],
        "name":"initializationParam",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"issuer",
        "outputs":[
            {
                "internalType":"address",
                "name":"",
                "type":"address"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"lineOfCredit",
        "outputs":[
            {
                "internalType":"uint256",
                "name":"",
                "type":"uint256"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"address",
                "name":"faceContact",
                "type":"address"
            }
        ],
        "name":"man_destroy",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"address",
                "name":"faceContact",
                "type":"address"
            }
        ],
        "name":"remoteCallL1NoParam",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[

        ],
        "name":"sendPopular",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"address",
                "name":"issuerAddress",
                "type":"address"
            }
        ],
        "name":"setIssuer",
        "outputs":[
            {
                "internalType":"bool",
                "name":"success",
                "type":"bool"
            }
        ],
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "inputs":[
            {
                "internalType":"uint256",
                "name":"lineOfCreditAmount",
                "type":"uint256"
            }
        ],
        "name":"setLineOfCredit",
        "outputs":[
            {
                "internalType":"bool",
                "name":"success",
                "type":"bool"
            }
        ],
        "stateMutability":"nonpayable",
        "type":"function"
    }
]