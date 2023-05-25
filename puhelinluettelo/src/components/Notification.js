import React from 'react'

const Notification = ({ notification, type, types }) => {
    if (notification === null) {
      return null
    }
    
    if(notification === '') {
        return null
    }

    if(type === types.success)  {  
    return (
      <div className="notification">
        {notification}
      </div>
    )
  }

  if(type === types.error)  {  
    return (
      <div className="error">
        {notification}
      </div>
    )
  }

  else {
    return (
      <div className="error">
        {notification}
        <p>something wrong</p>
      </div>
    )
  }

}

 export default Notification 