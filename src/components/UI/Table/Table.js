import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import { connect } from 'react-redux';
import { TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactSVG from 'react-svg';


import Moment from 'react-moment';
import classes from './Table.module.scss';
import IconCC from './../../../assets/images/icons/credit_card_icon.svg';
import IconExclamation from './../../../../src/assets/images/icons/exclamation_icon.svg';
import Button from './../Button/Button';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import RateStars from '../../Ratings/RateStars/RateStars';
import IDExpansionPanel from '../ExpansionPanel/ExpansionPanel';
import IconInfo from './../../../../src/assets/images/icons/info_icon.svg';
import IDPopover from  './../Popover/Popover';
import ArrowLeft from './../../../../src/assets/images/icons/arrow_left_icon.svg';
import ArrowRight from "./../../../../src/assets/images/icons/arrow_right_icon.svg";
import IDSlide from '../../UI/Slide/Slide';
import Divider from '../../UI/Divider/Divider';


const legendStatus = [
  {
    // new: {
      status: 'NEW',
      color: '#83a8d4',
      title: 'New',
      content: 'Your request for a payout was received.'
    // }
  }, 
  {
    // pending: {
      status: 'PENDING',
      color: '#ecb84c',
      title: 'Pending',
      content: 'Your payout request was received and will be processed.'
    // }
  },
  {
    // onHold: {
      status: 'ONHOLD',
      color: '#ecb84c',
      title: 'On hold',
      content: 'Your payout request is being reviewed and is on hold.'
    // }
  }, 
  {
    // success: {
      status: 'SUCCESS',
      color: '#75c89f',
      title: 'Success',
      content: 'Funds have been credited to your account.'
    // }
  },
  {
    // denied: {
      status: 'DENIED',
      color: '#ef5959',
      title: 'Denied',
      content: 'Your payout was denied, so funds have not been deducted from your account.'
    // }
  },
  {
    // failed: {
      status: 'FAILED',
      color: '#ef5959',
      title: 'Failed',
      content: 'This payout request has failed, so funds were not deducted from your account.'
    // }
  },
  {
    // unclaimed: {
      status: 'UNCLAIMED',
      color: '#ef5959',
      title: 'Unclaimed',
      content: 'You don’t have a PayPal account. A link to sign up for a PayPal account was sent to you. However, if you don’t claim your payout within 30 days, the funds are returned to your account.'
    // }
  },
  {
    // returned: {
      status: 'RETURNED',
      color: '#eb9e79',
      title: 'Returned',
      content: 'You have not claimed your payout, so the funds have been returned to your account.'
    // }
  },
  {
    // blocked: {
      status: 'BLOCKED',
      color: '#ef5959',
      title: 'Blocked',
      content: 'This payout request has been blocked.'
    // }
  },

]

const statusType = (transaction) => {

  if (transaction === 'NEW') {
    return <span className={classes.PopoverAnchor}><span className={classes.StatusDot} style={{backgroundColor: `${legendStatus[0].color}`}}></span><IDPopover open={'New'} content={legendStatus[0].content}/></span>
  } else if(transaction === 'SUCCESS') {
    return <span className={classes.PopoverAnchor}><span className={classes.StatusDot} style={{backgroundColor: `${legendStatus[3].color}`}}></span><IDPopover open={'Success'} content={legendStatus[3].content}/></span>
  } else if(transaction === 'DENIED') {
    return <span className={classes.PopoverAnchor}><span className={classes.StatusDot} style={{backgroundColor: `${legendStatus[4].color}`}}></span><IDPopover open={'Denied'} content={legendStatus[4].content}/></span>
  } else if(transaction === 'PENDING') {
    return <span className={classes.PopoverAnchor}><span className={classes.StatusDot} style={{backgroundColor: `${legendStatus[1].color}`}}></span><IDPopover open={'Pending'} content={legendStatus[1].content}/></span>
  } else if(transaction === 'FAILED') {
    return <span className={classes.PopoverAnchor}><span className={classes.StatusDot} style={{backgroundColor: `${legendStatus[5].color}`}}></span><IDPopover open={'Failed'} content={legendStatus[5].content}/></span>
  } else if(transaction === 'UNCLAIMED') {
    return <span className={classes.PopoverAnchor}><span className={classes.StatusDot} style={{backgroundColor: `${legendStatus[6].color}`}}></span><IDPopover open={'Unclaimed'} content={legendStatus[6].content}/></span>
  } else if(transaction === 'RETURNED') {
    return <span className={classes.PopoverAnchor}><span className={classes.StatusDot} style={{backgroundColor: `${legendStatus[7].color}`}}></span><IDPopover open={'Returned'} content={legendStatus[7].content}/></span>
  } else if(transaction === 'ONHOLD') {
    return <span className={classes.PopoverAnchor}><span className={classes.StatusDot} style={{backgroundColor: `${legendStatus[2].color}`}}></span><IDPopover open={'On Hold'} content={legendStatus[2].content}/></span>
  } else if(transaction === 'BLOCKED') {
    return <span className={classes.PopoverAnchor}><span className={classes.StatusDot} style={{backgroundColor: `${legendStatus[8].color}`}}></span><IDPopover open={'Blocked'} content={legendStatus[8].content}/></span>
  } else {
    return ''
  }
} 
 
console.log(statusType())
const transactionHistoryTable = (props) => {
  const transactionData = props.data;

  console.log('Screen Props', props)

  const isTeacher = props.user === 'teacher';

  const screen = props.screen;

  const screenHeight = props.screenHeight;
  
  const tableHeadRender = () => {
  
  let name = props.name;

  switch (name) {
    case 'purchases' : 
      return screen > 1280 ? <TableRow>
      <TableCell>
        No
      </TableCell>
      <TableCell>
        Date        
      </TableCell>
      <TableCell>
        Description
      </TableCell>
      <TableCell>
        Type
      </TableCell>
      <TableCell>
        Seller        
      </TableCell>
      <TableCell>
        Price
      </TableCell>
    </TableRow> : <TableRow>
      {screen >= 768 ? <React.Fragment>
        <TableCell>
          Date
        </TableCell>
      </React.Fragment> : '' }
      <TableCell>
        Description
      </TableCell>
      <TableCell>
        Price
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>
        
      </TableCell>
    </TableRow> 
  case 'orders' : 
  return screen > 1280 ?  <TableRow>
      <TableCell>
          No
      </TableCell>
      <TableCell>
          Date
      </TableCell>
      <TableCell>
          Payment Type
      </TableCell>
      <TableCell>
          Amount
      </TableCell>
    </TableRow> : <TableRow>
      {screen >= 768 ? <React.Fragment>
        <TableCell>
          Date
        </TableCell>
      </React.Fragment> : '' }
      <TableCell>
          Payment type
      </TableCell>
      <TableCell>
          Amount
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>
        
      </TableCell>
    </TableRow>;
  case 'sales' : 
    return screen > 1280 ? <TableRow>
      <TableCell>
          No
      </TableCell>
      <TableCell>
          Date
      </TableCell>
      <TableCell>
          Description
      </TableCell>
      <TableCell>
          Type
      </TableCell>
      <TableCell>
          Buyer
      </TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Fee</TableCell>
      <TableCell>Earning</TableCell>
    </TableRow> : 
      <TableRow>
        {screen >= 768 ? <React.Fragment>
        <TableCell>
          Date
        </TableCell>
        </React.Fragment> : '' }
        <TableCell>
          Description
        </TableCell>
        
        <TableCell>Earning</TableCell>
        <TableCell style={{width: '20px', height: '20px'}}>

        </TableCell>
      </TableRow>
    ;
  case 'payouts' : 
    return screen > 1280 ? <TableRow>
      <TableCell>
        No
      </TableCell>
      <TableCell>
        Date
      </TableCell>
      <TableCell>
        Description
      </TableCell>
      <TableCell>
        Amount
      </TableCell>
      <TableCell>
        Status
      </TableCell>
    </TableRow> : 
    <TableRow>
        {screen >= 768 ? <React.Fragment>
          <TableCell>
            Date
          </TableCell>
        </React.Fragment> : '' }
        <TableCell>
          Amount 
        </TableCell>
        <TableCell>Status</TableCell>
        <TableCell style={{width: '20px', height: '20px'}}>

        </TableCell>
    </TableRow>
    }
  };

  const tableBodyRender = (transaction) => {
    const name = props.name;
    const transactionType = (type) => {
      if (type === 'purchase_video_class') {
        return 'Video'
      } else if ( transaction.type ==='purchase_call_class') {
        return 'Live Call'  
      } else if ( transaction.type ==='purchase_infodepot_fee') {
        return 'InfoDepot fee'  
      } else if ( transaction.transactionType ==='braintree_credit_card') {
        return 'Credit card'  
      } else if ( transaction.transactionType ==='stripe_credit_card') {
        return 'Credit card'  
      } else if ( transaction.transactionType ==='braintree_paypal_account') {
        return 'PayPal'  
      } else if ( transaction.transactionType ==='paypal_checkout') {
        return 'PayPal'  
      } else {
        return '';
      }
    } 

    

    const typeOfClass = () => 
      transaction.type ==='purchase_video_class' ? 
      <Link to={`/video/`+ transaction.videoClass.slug}>
        {transaction.description}
      </Link> : <Link to={`/call/`+ transaction.callClass}>
        {transaction.description}
      </Link>
   

    switch (name) {
     case 'purchases' : 
      return screen > 1280 ? <TableRow key={transaction.slug}>
      <TableCell>
        {transaction.purchaseNumber}
      </TableCell>
      <TableCell>
        <Moment format="MM/DD/YYYY">
            {transaction.createdAt}
        </Moment>
      </TableCell>
      <TableCell>
        {typeOfClass()}
        { isTeacher === true && transaction.type === 'purchase_infodepot_fee' ? ' video upload' : '' }
      </TableCell>
      <TableCell>
        {transactionType(transaction.type)}
      </TableCell>
      <TableCell>
        {transactionData && transaction.seller ? (transaction.seller.profile.firstName === 'Admin' ? transaction.seller && transaction.seller.profile.lastName : transaction.seller && transaction.seller.profile.name) : '' }
      </TableCell>
      <TableCell>
        ${transaction.price}
      </TableCell>
    </TableRow> : <TableRow key={transaction.slug}>
      {screen >= 768 ? <React.Fragment>
        <TableCell>
          <Moment format="MM/DD/YYYY">
              {transaction.createdAt}
          </Moment>
        </TableCell>
      </React.Fragment> : '' }
      <TableCell>
        {typeOfClass()}
        { isTeacher === true && transaction.type === 'purchase_infodepot_fee' ? ' video upload' : '' }
      </TableCell>
      <TableCell>
        ${transaction.price}
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>
        <IDSlide
          closeIcon={<ReactSVG src={ArrowLeft} className={classes.ArrowLeft}/>}
          slideHeight={screenHeight + 'px'}
          slideItemTitle={<h2>Purchase details</h2>}
          slideOpenIcon={<ReactSVG src={ArrowRight} className={classes.ArrowRight} />}
          slideTransition={"left"}
          slideItems={<div className={classes.SlideHeader}>
          <div className={classes.SlideDescription}>
            <div>Description</div>
            <div>
              {typeOfClass()}
              { isTeacher === true && transaction.type === 'purchase_infodepot_fee' ? ' video upload' : '' }
            </div>
          </div>
          <div className={classes.SlideWrap}>
          <div className={classes.SlideGeneral}>
            <div>
              No
            </div>
            <div>
              {transaction.purchaseNumber}
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Date
            </div>
            <div>
            <Moment format="MM/DD/YYYY">
                {transaction.createdAt}
            </Moment>
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Type
            </div>
            <div>
              {transactionType(transaction.type)}
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Seller
            </div>
            <div>
              {transactionData && transaction.seller ? (transaction.seller.profile.firstName === 'Admin' ? transaction.seller && transaction.seller.profile.lastName : transaction.seller && transaction.seller.profile.name) : '' }
            </div>  
          </div>
          <div>
            <Divider horizontal={true} className={classes.Divider}></Divider>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Price
            </div>
            <div>
              ${transaction.price}
            </div>
          </div>
          </div>
        </div>}
        >
          
        </IDSlide>
      </TableCell>
    </TableRow> ;
    case 'orders' : 
      return screen > 1280 ? <TableRow key={transaction.slug}>
        <TableCell>
          {transaction.orderNumber}
        </TableCell>
        <TableCell>
          <Moment format="MM/DD/YYYY">
              {transaction.createdAt}
          </Moment>
        </TableCell>
        <TableCell>
          {transactionType(transaction.transactionType)}
        </TableCell>
        <TableCell>
          ${transaction.amount}
        </TableCell>
      </TableRow> : <TableRow key={transaction.slug}>
      {screen >= 768 ? <React.Fragment>
        <TableCell>
          <Moment format="MM/DD/YYYY">
              {transaction.createdAt}
          </Moment>
        </TableCell>
        </React.Fragment>  : ''}
      <TableCell>
        {transactionType(transaction.transactionType)}
      </TableCell>
      <TableCell>
        ${transaction.amount}
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>
        <IDSlide 
          closeIcon={<ReactSVG src={ArrowLeft} className={classes.ArrowLeft}/>}
          slideItemTitle={<h2>Top Up details</h2>}
          slideOpenIcon={<ReactSVG src={ArrowRight} className={classes.ArrowRight} />}
          slideTransition={"left"}
          slideItems={<div className={classes.SlideHeader}>
          <div className={classes.SlideDescription}>
            <div>Payment Type</div>
            <div>
              {transactionType(transaction.type)}
            </div>
          </div>
          <div className={classes.SlideWrap}>
          <div className={classes.SlideGeneral}>
            <div>
              No
            </div>
            <div>
              {transaction.orderNumber}
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Date
            </div>
            <div>
            <Moment format="MM/DD/YYYY">
                {transaction.createdAt}
            </Moment>
            </div>
          </div>
          <div>
            <Divider horizontal={true} className={classes.Divider}></Divider>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Amount
            </div>
            <div>
              ${transaction.amount}
            </div>
          </div>
          </div>
        </div>}
        >
        </IDSlide>
      </TableCell>
    </TableRow>;
    case 'sales' : 
      return screen > 1280 ? <TableRow key={transaction.slug}>
        <TableCell>
          {transaction.purchaseNumber}
        </TableCell>
        <TableCell>
          <Moment format="MM/DD/YYYY">
              {transaction.createdAt}
          </Moment>
        </TableCell>
        <TableCell>
          {typeOfClass()}
        </TableCell>
        <TableCell>
          {transactionType(transaction.type)}
        </TableCell>
        <TableCell>
          {transaction.author.username}
        </TableCell>
        <TableCell>${transaction.price}</TableCell>
        <TableCell>- ${transaction.fee}</TableCell>
        <TableCell>${transaction.earning}</TableCell>
      </TableRow> : <TableRow>
      {screen >= 768 ? <React.Fragment>
      <TableCell>
        <Moment format="MM/DD/YYYY">
            {transaction.createdAt}
        </Moment>
      </TableCell>
      </React.Fragment> : ''}
      <TableCell>
        {typeOfClass()}
      </TableCell>
      
      <TableCell>${transaction.earning}</TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>
        <IDSlide 
          closeIcon={<ReactSVG src={ArrowLeft} className={classes.ArrowLeft}/>}
          slideItemTitle={<h2>Sale details</h2>}
          slideOpenIcon={<ReactSVG src={ArrowRight} className={classes.ArrowRight} />}
          slideTransition={"left"}
          slideItems={<div className={classes.SlideHeader}>
          <div className={classes.SlideDescription}>
            <div>Description</div>
            <div>
              {typeOfClass()}
            </div>
          </div>
          <div className={classes.SlideWrap}>
          <div className={classes.SlideGeneral}>
            <div>
              No
            </div>
            <div>
              {transaction.purchaseNumber}
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Date
            </div>
            <div>
            <Moment format="MM/DD/YYYY">
                {transaction.createdAt}
            </Moment>
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Type
            </div>
            <div>
              {transactionType(transaction.type)}
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Buyer
            </div>
            <div>
              {transaction.author.username}
            </div>
          </div>
          <div>
            <Divider horizontal={true} className={classes.Divider}></Divider>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Price
            </div>
            <div>
              ${transaction.price}
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Fee
            </div>
            <div>
              - ${transaction.fee}
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Earning
            </div>
            <div>
              ${transaction.earning}
            </div>
          </div>
          </div>
        </div>}
        >
        </IDSlide>
      </TableCell>
      </TableRow>;
    case 'payouts' : 
      return screen > 1280 ? <TableRow key={transaction.slug}>
        <TableCell>
          {transaction.transactionNumber}
        </TableCell>
        <TableCell>
          <Moment format="MM/DD/YYYY">
              {transaction.createdAt}
          </Moment>
        </TableCell>
        <TableCell>
          {transaction.description}
        </TableCell>
        <TableCell>
          ${transaction.totalAmount}
        </TableCell>
        <TableCell>
          {statusType(transaction.status)}
        </TableCell>
      </TableRow> : <TableRow>
        {screen >= 768 ? <React.Fragment>
        <TableCell>
          <Moment format="MM/DD/YYYY">
              {transaction.createdAt}
          </Moment>
        </TableCell>
      </React.Fragment> : '' }
      <TableCell>
          ${transaction.totalAmount}
        </TableCell>
        <TableCell>
          {statusType(transaction.status)}
        </TableCell>
        <TableCell style={{width: '20px', height: '20px'}}>
        <IDSlide 
          closeIcon={<ReactSVG src={ArrowLeft} className={classes.ArrowLeft}/>}
          slideItemTitle={<h2>Payout details</h2>}
          slideOpenIcon={<ReactSVG src={ArrowRight} className={classes.ArrowRight} />}
          slideTransition={"left"}
          slideItems={<div className={classes.SlideHeader}
          
          >
          <div className={classes.SlideDescription}>
            <div>Description</div>
            <div>
              {transaction.description}
            </div>
          </div>
          <div className={classes.SlideWrap}>
          <div className={classes.SlideGeneral}>
            <div>
              No
            </div>
            <div>
              {transaction.transactionNumber}
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Date
            </div>
            <div>
            <Moment format="MM/DD/YYYY">
                {transaction.createdAt}
            </Moment>
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Status
            </div>
            <div>
              {statusType(transaction.status)}
            </div>
          </div>
          <div>
            <Divider horizontal={true} className={classes.Divider}></Divider>
          </div>
          
          <div className={classes.SlideGeneral}>
            <div>
              Total amount
            </div>
            <div>
              ${transaction.totalAmount}
            </div>
          </div>
          </div>
        </div>}
        >
        </IDSlide>
      </TableCell>
      </TableRow>;
   }
  };

  const blankBodyrender = () => {
    let name = props.name;
    switch (name) {
      case 'purchases' : return 'No purchases.'
      case 'orders' : return 'No Top-Ups.' 
      case 'sales' : return 'No Sales.'
      case 'payouts' : return 'No Payouts.'
    }
  }

  const legendPayoutsRender = () => { 
    // let name = props.name;

    let icon = <ReactSVG src={IconInfo} className={classes.IconInfo} />;

    let transactionStatus = <React.Fragment>
      <Divider style={{marginBottom: '20px'}} horizontal/>
      {legendStatus.map((statusItem, i) => <div className={classes.PanelColumn} key={i++}>
        <span className={classes.StatusDot} style={{ backgroundColor: `${statusItem.color}` }}></span>
        <span className={classes.LegendText}>{statusItem.title} - {statusItem.content}</span>
        {/* <span className={classes.Content}> {statusItem.content}</span> */}
      </div>)}
    </React.Fragment>
    
    return name === 'payouts' ? <IDExpansionPanel className={classes.LegendExpansion} paneltitle={'Legend '} icon={icon}  expandIcon={<ArrowDropDown className={classes.ArrowDropDown}/>}>{transactionStatus}</IDExpansionPanel> : '' ;
  }

  let name = props.name;

  return (
    <div>
      <div className={classes.TableWrap} style={name === 'payouts' ? { paddingBottom: '0', borderBottomRightRadius: '0', borderBottomLeftRadius: '0' } : { paddingBottom: '24px' }}>
        <Table className={classes.Table}>
          <TableHead className={classes.TableHead}
          >
          { tableHeadRender() }
            
          </TableHead>
          <TableBody>
          {!transactionData ? 
          <TableRow>
            <td colSpan="12" className={classes.EmptyCell}>
              <ReactSVG svgClassName={classes.IconCC} src={IconCC} />
              <h3>{blankBodyrender()}</h3>
            </td>
          </TableRow> : transactionData && transactionData.map((transaction, i) => (
            <React.Fragment key={i}>
              {tableBodyRender(transaction)}
            </React.Fragment>
          ))}
          </TableBody>
        </Table>
      </div>
      {legendPayoutsRender()}
  </div>
  );
}

// Live tutoring calls tables for student and for teacher

const icon = <ReactSVG svgClassName={classes.IconExclamation} src={IconExclamation} />;

const liveTutoringCallsTeacher = (props) => {
  const callsData = props.data;
  const user = props.user;

  console.log("liveTutoringCallsTeacher", callsData)

  const screen = props.screen;

  const tableHeadRender = (call) => {
    const user = props.user;
    return screen > 1280 ? <TableRow>
      <TableCell>
        Date & Time
      </TableCell>
      <TableCell>
        Call Title      
      </TableCell>
      <TableCell>
        Student
      </TableCell>
      <TableCell>
        Duration
      </TableCell>
      <TableCell>
        Status       
      </TableCell>
    </TableRow> : <TableRow>
    {screen > 768 ? <React.Fragment>
      <TableCell>
        Date & Time
      </TableCell>
    </React.Fragment> : '' }
    <TableCell>
      Call Title      
    </TableCell>
    <TableCell>
      Status       
    </TableCell> 
    <TableCell style={{width: '20px', height: '20px'}}></TableCell>
    </TableRow> ;
  }

    const tableBodyRender = (call, user) => {

      const callType = (displayStatus) => {
        if (call.displayStatus === 'in-progress') {
          return <span><span className={[classes.StatusDot, classes.InProgress].join(' ')}></span> In progress</span>
        } else if ( call.displayStatus === 'student_missed' || call.displayStatus === 'student_rejected') {
          return <span><span className={[classes.StatusDot, classes.Failed].join(' ')}></span> Failed 
            <span className={classes.InfoTooltip}>
              <IDPopover open={icon} content={"We're sorry, the student seems to be unavailable"}></IDPopover>
            </span>
          </span>
        } else if ( call.displayStatus ==='completed') {
          return <span><span className={[classes.StatusDot, classes.Completed].join(' ')}></span> Completed</span>  
        } else if ( call.displayStatus ==='teacher_missed') {
          return <span><span className={[classes.StatusDot, classes.Missed].join(' ')}></span> Missed call</span>  
        } else if ( call.displayStatus ==='teacher_rejected') {
          return <span><span className={[classes.StatusDot, classes.Rejected].join(' ')}></span> Rejected</span> 
        } 
        else {
          return '';
      }
    } 

    const durationRender = () => {
      const hours = Math.floor(call.callToStudentDuration / 3600);

      call.callToStudentDuration -= hours * 3600;

      const minutes = Math.floor(call.callToStudentDuration / 60);
      call.callToStudentDuration -= minutes * 60;

      const seconds = parseInt(call.callToStudentDuration % 60, 10);

     

      return (hours > 0 ? hours + ' hour' : '') + ' ' + (minutes > 0 ? (minutes < 10 ? '0' + minutes + ' min' : minutes + ' min') : '') + ' ' + (seconds > 0 ? (seconds < 10 ? '0' + seconds + ' sec' : seconds + ' sec') : '');
    }

    return screen > 1280 ? <TableRow>
      <TableCell>
          <Moment format="MMM DD, YYYY HH:mm">
              {call.createdAt}
          </Moment>
        </TableCell>
      <TableCell>
        <Link to={'/call/' + call.callClass}>{call.callClassName}</Link>
      </TableCell>
      <TableCell>
        {call.author.username}
      </TableCell>
      <TableCell>
        {call.callToStudentDuration ? durationRender(call.callToStudentDuration) : '--' }
      </TableCell>
      <TableCell>
        {callType(call.displayStatus)}
      </TableCell>
    </TableRow> : <TableRow>
      {screen >= 768 ? <React.Fragment>
        <TableCell>
          <Moment format="MM/DD/YYYY">
              {call.createdAt}
          </Moment>
        </TableCell>
      </React.Fragment> : '' }
      <TableCell>
        <Link to={'/call/' + call.callClass}>{call.callClassName}</Link>
      </TableCell>
      <TableCell>
        {callType(call.displayStatus)}
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>
        <IDSlide 
          closeIcon={<ReactSVG src={ArrowLeft} className={classes.ArrowLeft}/>}
          slideItemTitle={<h2>Call Overview</h2>}
          slideOpenIcon={<ReactSVG src={ArrowRight} className={classes.ArrowRight} />}
          slideTransition={"left"}
          slideItems={<div className={classes.SlideHeader}

          >
          <div className={classes.SlideDescription}>
            <div>Live Tutoring Call Title</div>
            <div>
              <Link to={'/call/' + call.callClass}>{call.callClassName}</Link>
            </div>
          </div>
          <div className={classes.SlideWrap}>
          
          <div className={classes.SlideGeneral}>
            <div>
              Date & Time
            </div>
            <div>
            <Moment format="MM/DD/YYYY">
                {call.createdAt}
            </Moment>
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Student
            </div>
            <div>
              { call.author.username }
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Duration
            </div>
            <div>
              {call.callToStudentDuration ? durationRender(call.callToStudentDuration) : '--' }
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Status
            </div>
            <div>
              {callType(call.displayStatus)}
            </div>
          </div>
          {/* <div>
            <Divider horizontal={true} className={classes.Divider}></Divider>
          </div> */}
          
          
          </div>
        </div>}
        />
      </TableCell>
    </TableRow> ;
  }

  const blankBodyrender = () => {
    return "Blank body"
  }

  return (
    <div className={classes.TableWrap}>
      <Table className={classes.Table}>
        <TableHead className={[classes.TableHead, classes.TableHeadNormal].join(' ')}
        >
        { tableHeadRender() }
          
        </TableHead>
        <TableBody>
        {!callsData ? 
        <TableRow>
          <td colSpan="12" className={classes.EmptyCell}>
            <React.Fragment>
              <ReactSVG svgClassName={classes.IconCC} src={IconCC} />
              <h3>{blankBodyrender()}</h3>
            </React.Fragment>
          </td>
        </TableRow> : callsData && callsData.map((call, i) => (
          <React.Fragment key={i}>
            {tableBodyRender(call)}
          </React.Fragment>
        ))}
        
        </TableBody>
      </Table>
    </div>
  )
}

const liveTutoringCallsStudent = (props) => {
  const callsData = props.data;
  const user = props.user;

  console.log("liveTutoringCallsStudent", callsData)

  const screen = props.screen;
  
  const tableHeadRender = (call) => {
    const user = props.user;
    return screen > 1280 ? <TableRow>
      <TableCell>
        Date & Time
      </TableCell>
      <TableCell>
        Call Title      
      </TableCell>
      <TableCell>
        Teacher
      </TableCell>
      <TableCell>
        Duration
      </TableCell>
      <TableCell>
        Status       
      </TableCell>
      <TableCell>
        Your review    
      </TableCell>
    </TableRow> : <TableRow>
    {screen > 768 ? <React.Fragment>
      <TableCell>
        Date & Time
      </TableCell>
    </React.Fragment> : '' }
    <TableCell>
      Call Title      
    </TableCell>
    <TableCell>
      Status       
    </TableCell> 
    <TableCell style={{width: '20px', height: '20px'}}></TableCell>
    </TableRow> ;
  }

  const tableBodyRender = (call, user) => {
    const callType = (displayStatus) => {
      if (call.displayStatus === 'in-progress') {
        return <span><span className={[classes.StatusDot, classes.InProgress].join(' ')}></span> In progress</span>
      } else if ( call.displayStatus === 'teacher_missed' || call.displayStatus === 'teacher_rejected') {
        return <span><span className={[classes.StatusDot, classes.Failed].join(' ')}></span> Failed 
          <span className={classes.InfoTooltip}>
            <IDPopover open={icon} content={"We're sorry, the teacher seems to be unavailable"}/>
          </span>
        </span>  
      } else if ( call.displayStatus ==='completed') {
        return <span><span className={[classes.StatusDot, classes.Completed].join(' ')}></span> Completed</span>  
      } else if ( call.displayStatus ==='student_missed') {
        return <span><span className={[classes.StatusDot, classes.Missed].join(' ')}></span> Missed call</span>  
      } else if ( call.displayStatus ==='student_rejected') {
        return <span><span className={[classes.StatusDot, classes.Rejected].join(' ')}></span> Rejected</span> 
      } 
      else {
        return '';
      }
    } 

    const durationRender = () => {
      const hours = Math.floor(call.callToStudentDuration / 3600);

      call.callToStudentDuration -= hours * 3600;

      const minutes = Math.floor(call.callToStudentDuration / 60);
      call.callToStudentDuration -= minutes * 60;

      const seconds = parseInt(call.callToStudentDuration % 60, 10);

     

      return (hours > 0 ? hours + ' hour' : '') + ' ' + (minutes > 0 ? (minutes < 10 ? '0' + minutes + ' min' : minutes + ' min') : '') + ' ' + (seconds > 0 ? (seconds < 10 ? '0' + seconds + ' sec' : seconds + ' sec') : '');
    }

    const ratingType = () => {
      const callRating = call.rate;

      if ( call.displayStatus === 'completed' && call.charge === 'charged' ) {
        return call.rate.length < 1 ? <Button onClick={(e) => { e.preventDefault(); props.rate.props.onButtonClick(call.slug, call.callClassName)}}>{props.rate.props.children}</Button> : <div className={classes.Review}>{callRating[0].rate.toFixed(2)}<RateStars className={classes.RateStars} rate={callRating[0].rate}></RateStars></div>;
      } else {
        return ''
      }
    } 
    
    return screen > 1280 ? <TableRow>
      <TableCell>
          <Moment format="MMM DD, YYYY HH:mm">
              {call.createdAt}
          </Moment>
        </TableCell>
      <TableCell>
        <Link to={'/call/' + call.callClass}>{call.callClassName}</Link>
      </TableCell>
      <TableCell>
        {call.teacherName}
      </TableCell>
      <TableCell>
        {call.callToStudentDuration ? durationRender(call.callToStudentDuration) : '--' }
      </TableCell>
      <TableCell>
        {callType(call.displayStatus)}
      </TableCell>
      <TableCell>
        {ratingType(call.displayStatus)}
      </TableCell>
    </TableRow> : <TableRow>
      {screen > 768 ? <React.Fragment>
        <TableCell>
          <Moment format="MM/DD/YYYY">
              {call.createdAt}
          </Moment>
        </TableCell>
      </React.Fragment> : '' }
      <TableCell>
        <Link to={'/call/' + call.callClass}>{call.callClassName}</Link>
      </TableCell>
      <TableCell>
        {callType(call.displayStatus)}
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>
        <IDSlide 
          closeIcon={<ReactSVG src={ArrowLeft} className={classes.ArrowLeft}/>}
          slideItemTitle={<h2>Call Overview</h2>}
          slideOpenIcon={<ReactSVG src={ArrowRight} className={classes.ArrowRight} />}
          slideTransition={"left"}
          slideItems={<div className={classes.SlideHeader}
          >
          <div className={classes.SlideDescription}>
            <div>Live Tutoring Call Title</div>
            <div>
              <Link to={'/call/' + call.callClass}>{call.callClassName}</Link>
            </div>
          </div>
          <div className={classes.SlideWrap}>
          
          <div className={classes.SlideGeneral}>
            <div>
              Date
            </div>
            <div>
            <Moment format="MM/DD/YYYY">
                {call.createdAt}
            </Moment>
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Teacher
            </div>
            <div>
              { call.teacherName }
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Duration
            </div>
            <div>
              {call.callToStudentDuration ? durationRender(call.callToStudentDuration) : '--' }
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Status
            </div>
            <div>
              {callType(call.displayStatus)}
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Your review
            </div>
            <div>
              {ratingType(call.displayStatus)}
            </div>
          </div>
          {/* <div>
            <Divider horizontal={true} className={classes.Divider}></Divider>
          </div> */}
          
          
          </div>
          </div>}
        />
      </TableCell>
    </TableRow> ;
      
  }

  const blankBodyrender = () => {
    return "Blank body"
  }

  return (
    <div className={classes.TableWrap}>
      <Table className={classes.Table}>
        <TableHead className={[classes.TableHead, classes.TableHeadNormal].join(' ')}
        >
        { tableHeadRender() }
          
        </TableHead>
        <TableBody>
        {!callsData ? 
        <TableRow>
          <td colSpan="12" className={classes.EmptyCell}>
            <React.Fragment>
              <ReactSVG svgClassName={classes.IconCC} src={IconCC} />
              <h3>{blankBodyrender()}</h3>
            </React.Fragment>
          </td>
        </TableRow> : callsData && callsData.map((call, i) => (
          <React.Fragment key={i}>
            {tableBodyRender(call)}
          </React.Fragment>
        ))}
        
        </TableBody>
      </Table>
    </div>
  )
}

// Queue call tables for student and for teacher
const queueCallsTeacher = (props) => {
  const queueCalls = props.data;
  const user = props.user;

  const screen = props.screen;

  const tableHeadRender = (queueCalls) => {
    return screen > 1280 ? <TableRow>
      <TableCell colSpan={'1'}>
        Date & Time
      </TableCell>
      <TableCell colSpan={'10'}>
        Live Tutoring Call Title      
      </TableCell>
      <TableCell>
        Student in a queue
      </TableCell>
    </TableRow> : <TableRow>
      <TableCell>
        Call title
      </TableCell>
      <TableCell>
        Student in a queue
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}></TableCell>
    </TableRow>
  }

  const tableBodyRender = (queueCalls, user) => {
    return screen > 1280 ? <TableRow>
      <TableCell>
        {screen > 768 ? <React.Fragment>
        <TableCell>
          <Moment format="MM/DD/YYYY">
              {queueCalls.createdAt}
          </Moment>
        </TableCell>
      </React.Fragment> : '' }
      </TableCell>
      <TableCell colSpan={'10'}>
        <Link to={'/call/' + queueCalls.callClass.slug}>{queueCalls.callClass.name}</Link>
      </TableCell>
      <TableCell>
        { queueCalls.author.fullName }
      </TableCell>
    </TableRow> : <TableRow>
      <TableCell colSpan={'10'}>
        <Link to={'/call/' + queueCalls.callClass.slug}>{queueCalls.callClass.name}</Link>
      </TableCell>
      <TableCell>
        { queueCalls.author.fullName }
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>
      <IDSlide 
          closeIcon={<ReactSVG src={ArrowLeft} className={classes.ArrowLeft}/>}
          slideItemTitle={<h2>Queued call details</h2>}
          slideOpenIcon={<ReactSVG src={ArrowRight} className={classes.ArrowRight} />}
          slideTransition={"left"}
          slideItems={<div className={classes.SlideHeader}
          >
          <div className={classes.SlideDescription}>
            <div>Call Title</div>
            <div>
            <Link to={'/call/' + queueCalls.callClass.slug}>{queueCalls.callClass.name}</Link>
            </div>
          </div>
          <div className={classes.SlideWrap}>
          
          <div className={classes.SlideGeneral}>
            <div>
              Date
            </div>
            <div>
            <Moment format="MMM DD, YYYY HH:mm">
                {queueCalls.createdAt}
            </Moment>
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Student in a queue
            </div>
            <div>
              { queueCalls.author.fullName }
            </div>
          </div>
          </div>
        </div>}
        />
      </TableCell>
    </TableRow>;
  }

  const blankBodyrender = () => {
    return "Blank body"
  }

  return (
    <div className={classes.TableWrap}>
      <Table className={classes.Table}>
        <TableHead className={[classes.TableHead, classes.TableHeadNormal].join(' ')}
        >
        { tableHeadRender() }
          
        </TableHead>
        <TableBody>
        {!queueCalls ? 
        <TableRow>
          <td colSpan="12" className={classes.EmptyCell}>
            <React.Fragment>
              <ReactSVG svgClassName={classes.IconCC} src={IconCC} />
              <h3>{blankBodyrender()}</h3>
            </React.Fragment>
          </td>
        </TableRow> : queueCalls && queueCalls.map((queueCall, i) => (
          <React.Fragment key={i}>
            {tableBodyRender(queueCall)}
          </React.Fragment>
        ))}
        
        </TableBody>
      </Table>
    </div>
  )
}

const queueCallsStudent = (props) => {
  const queueCalls = props.data;

  const screen = props.screen;

  console.log('Queue Calls',props.data)

  const tableHeadRender = (queueCalls) => {
    return screen > 1280 ? <TableRow>
      <TableCell>
        Date & Time
      </TableCell>
      <TableCell>
      {screen >= 768 ? 'Live Tutoring Call Title' : 'Call Title'}
      </TableCell>
      <TableCell>
        Teacher
      </TableCell>
      <TableCell>
        Your place in a queue
      </TableCell>
    </TableRow> : <TableRow>
      <TableCell>
        {screen >= 768 ? 'Live Tutoring Call Title' : 'Call Title'}
      </TableCell>
      <TableCell>
      {screen >= 768 ? 'Your place in a queue' : 'Queue place'}
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>

      </TableCell>
    </TableRow>;
  }

  const tableBodyRender = (queueCalls) => {
    return screen > 1280 ?  <TableRow>
      <TableCell>
        <Moment format="MMM DD, YYYY HH:mm">
            {queueCalls.createdAt}
        </Moment>
      </TableCell>
      <TableCell>
        <Link to={'/call/' + queueCalls.callClass.slug}>{queueCalls.callClass.name}</Link>
      </TableCell>
      <TableCell>
        { queueCalls.teacher.fullName }
      </TableCell>
      <TableCell>
        { queueCalls.teacher.liveCallQueuesCount - 1 }
      </TableCell>
    </TableRow> : <TableRow>
      <TableCell>
        <Link to={'/call/' + queueCalls.callClass.slug}>{queueCalls.callClass.name}</Link>
      </TableCell>
      <TableCell>
        { queueCalls.teacher.liveCallQueuesCount - 1 }
      </TableCell>
      <TableCell style={{width: '20px', height: '20px'}}>
      <IDSlide 
          closeIcon={<ReactSVG src={ArrowLeft} className={classes.ArrowLeft}/>}
          slideItemTitle={<h2>Queued call details</h2>}
          slideOpenIcon={<ReactSVG src={ArrowRight} className={classes.ArrowRight} />}
          slideTransition={"left"}
          slideItems={<div className={classes.SlideHeader}
          >
          <div className={classes.SlideDescription}>
            <div>Call Title</div>
            <div>
            <Link to={'/call/' + queueCalls.callClass.slug}>{queueCalls.callClass.name}</Link>
            </div>
          </div>
          <div className={classes.SlideWrap}>
          
          <div className={classes.SlideGeneral}>
            <div>
              Date
            </div>
            <div>
            <Moment format="MMM DD, YYYY HH:mm">
                {queueCalls.createdAt}
            </Moment>
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Teacher
            </div>
            <div>
              { queueCalls.teacher.fullName }
            </div>
          </div>
          <div className={classes.SlideGeneral}>
            <div>
              Your place in a queue
            </div>
            <div>
              { queueCalls.teacher.liveCallQueuesCount - 1 }
            </div>
          </div>         
          
          </div>
        </div>}
        />
      </TableCell>
    </TableRow>;
  }

  const blankBodyrender = () => {
    return "Blank body"
  }

  return (
    <div className={classes.TableWrap}>
      <Table className={classes.Table} width={'100%'}>
        <TableHead className={[classes.TableHead, classes.TableHeadNormal].join(' ')}
        >
        { tableHeadRender() }
        </TableHead>
        <TableBody>
        {!queueCalls ? 
        <TableRow>
          <td colSpan="12" className={classes.EmptyCell}>
            <React.Fragment>
              <ReactSVG svgClassName={classes.IconCC} src={IconCC} />
              <h3>{blankBodyrender()}</h3>
            </React.Fragment>
          </td>
        </TableRow> : queueCalls && queueCalls.map((queueCall, i) => (
          <React.Fragment key={i}>
            {tableBodyRender(queueCall)}
          </React.Fragment>
        ))}
        
        </TableBody>
      </Table>
    </div>
  )
}

const IDTable = (props) => {
	switch (props.typeTable) {
		case 'transactionsTable':
			return transactionHistoryTable(props);
		case 'callsTableTeacher':
      return liveTutoringCallsTeacher(props);
    case 'callsTableStudent':
      return liveTutoringCallsStudent(props);
    case 'queueCallsTeacher':
      return queueCallsTeacher(props);
    case 'queueCallsStudent':
      return queueCallsStudent(props);
    default:
      return null  
	}
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps)(IDTable);