import React from "react";
import { Link } from 'react-router-dom';

function LandingPage() {

    return (
        <div style={{
            display:'flex', 
            justifyContent: 'center',
            alignItems: 'center', 
            width: '100%', 
            height: '100vh'}}>
            <Link to='/todo'><button>ToDo리스트</button></Link>
            {/* <Link to='/login'><button>로그인</button></Link>
            <Link to='/signup'><button>회원가입</button></Link> */}
        </div>
    );
}

export default LandingPage;