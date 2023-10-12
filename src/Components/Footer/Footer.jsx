import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom';

import {BsDashLg} from "react-icons/bs"
import {AiFillInstagram,AiFillTwitterCircle,AiFillYoutube} from "react-icons/ai"
import {MdLocationPin,MdCall,MdMail,MdOutlineFacebook,} from 'react-icons/md'
import LOGO from '../../assets/prestocleantrans.png'

export default function Footer() {
  return (
    <div>
        <div className='container-footer'>
        <div className="footer-content">
          <section className="footer-section">
            <img src=
            {LOGO} alt="prestocleanlogo" style={{width:"100%"}}/>
            <p> PRESTO CLEAN <BsDashLg/> Your Trusted Laundry Service in Guwahati. We take pride in providing premium laundry solutions to the vibrant community of Guwahati</p>
          </section>

          <section className="footer-section">
            <h3>Contact</h3>
            <p>Contact us for any inquiries or support.
            </p>
            <p><MdLocationPin/>Center 1 ,Hengrabari, Guwahati</p>
            <p><MdLocationPin/>Center 2 , Zoo Road, Guwahati</p>
            <p><MdCall /> +91 6003509743
            </p>
            <p><MdMail /> <i>prestoclean@gmail.com </i></p>

          </section>

         

          <section className="footer-section">
            <h3>Company</h3>
            <p><Link to='/Terms' style={{ textDecoration: 'none', color: 'white' }}>Terms & Conditios</Link></p>
            {/* <p>Privacy Policy</p> */}
            <p><Link to='/services' style={{ textDecoration: 'none', color: 'white' }}>Our Services</Link></p>
          </section>
          <section className="footer-section">
            <h3>Social Media</h3>
            <p>Follow us on social media for updates.</p>
            <p><MdOutlineFacebook style={{fontSize:'40px',cursor:'pointer'}}/>     <AiFillInstagram style={{fontSize:'40px',cursor:'pointer'}}/> <AiFillTwitterCircle style={{fontSize:'40px',cursor:'pointer'}}/> <AiFillYoutube style={{fontSize:'40px',cursor:'pointer'}}/></p>
          </section>
        </div>

        <div className="footer-bottom">
          <p>Designed and developed by <span><a href="https://gigcrafters.netlify.app/" style={{textDecoration:'none',color:"white"}}>GigCrafters</a></span></p>
        </div>
      </div>
    </div>
  )
}


