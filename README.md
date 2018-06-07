# E2W-Backend

This is Ethereum and EOS Wallet Backend.

설치: node 설치 and npm install

실행: npm start

설정: project folder/configs/config.js
- jwtSecret - jwt token을 암호화하기 위한 key
- ethHttpProvider - 이더리움 노드(rpc) 주소

1. 계정 생성 기능 
  - http post
  - /api/v1/register
  - parameter
    {
      email:'',
      password:'',
      secret:''  -> privatkey를 암호화 하기위한 key
    }
  - todo
    - db로 계정 관리 - mongo db 사용 예정
    
2. 로그인 기능 - /api/v1//login
  - http post
  - /api/v1/login
  - parameter
    {
      email:'',
      password:''
    }
  - jwt token 인증기능 포함
  - todo
    - 보안을 위해 https 적용 해야함
    
3. 밸런스 얻어오기 기능
  - http get
  - /api/v1/balance
  - parameter
    email=''
    unit='' -> default ether, unit='wei' wei로 보냄
    
4. 계좌 이체 기능
  - http post
  - /api/v1/transfer
  - parameter
    {
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


추가 완료
