# E2W-Backend

This is Ethereum and EOS Wallet Backend.

설치: node 설치 and npm install, 몽고 db 설치 필요

실행: npm start

설정: project folder/configs/config.js
- jwtSecret - jwt token을 암호화하기 위한 key
- ethUrl - 이더리움 노드(rpc) 주소
- mongoUrl - 몽고 db 주소

API:
1. 계정 생성 기능 
  - http post
  - /api/v1/register
  - parameter
    - {
      email:'',
      password:'',
      secret:''  -> privatkey를 암호화 하기위한 key
    }
    
2. 로그인 기능
  - http post
  - /api/v1/login
  - parameter
    - {
      email:'',
      password:''
    }
  - jwt token 인증기능 포함
  - todo
    - 보안을 위해 https 적용 해야함

3. 밸런스 얻어오기 기능 (이더리움)
  - http get
  - /api/v1/eth/balance
  - parameter
    - email=''
    - unit='' -> default ether, unit='wei' wei로 보냄
    
4. 지갑 주소 얻어오기 기능 (이더리움)
  - http get
  - /api/v1/eth/address
  - parameter
    - email=''
    
5. 계좌 이체 기능 (이더리움)
  - http post
  - /api/v1/eth/transfer
  - parameter
    - {
      email:'',
      to:'',
      value:'',    -> ether
      data:'',
      gasLimit:'',
      gasPrice:'',
      secret:''   -> privatkey를 암호화 하기위한 key
    }
  - todo
    - 보안을 위해 https 적용 해야함

6. 거래 이력 조회 기능 ( 최근 30개 )  (이더리움)
  - http get
  - /api/v1/eth/transactionHistory
  - parameter
    - email=''


7. ERC20 Token 정보 조회 (이더리움)
  - http get
  - /api/v1/eth/erc20/info
  - parameter
    - email=''
    - erc20TokenAddress=''    ->  token contract address

8. ERC20 Token 이체 기능 (이더리움)
  - http get
  - /api/v1/eth/erc20/transfer
  - parameter
    - {
      email:'',
      erc20TokenAddress:'',
      to:'',
      value:'',    -> token
      gasLimit:'',
      gasPrice:'',
      secret:''   -> privatkey를 암호화 하기위한 key
    }
  - todo
    - 보안을 위해 https 적용 해야함

추가 완료

ToDo

ERC20 Token 거래 기능
