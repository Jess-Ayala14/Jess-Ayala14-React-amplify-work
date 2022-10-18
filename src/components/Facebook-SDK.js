import React, { useState } from 'react';



export const OnLoginFB = (setloginFB) => {
    window.FB.login(function (response) {
        setloginFB(true);
        window.location.reload();
    },
        {
            scope: "email, public_profile ,pages_show_list, pages_read_engagement, pages_manage_posts,  pages_read_user_content, instagram_basic, instagram_content_publish"
        }
    );

}


export const LogoutFB = (setloginFB) => {
    window.FB.logout(function (response) {
        setloginFB(false);
        window.location.reload();
    });

}

export const ScriptFB = (setloginFB) => {
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: "801174264382809",
            cookie: true,
            xfbml: true,
            version: 'v14.0'
        });

        window.FB.getLoginStatus(function (response) {
            StatusChangeCallbackFB(response);
        });
    };

    async function CheckLoginStateFB() {
        window.FB.getLoginStatus(function (response) {
            StatusChangeCallbackFB(response);
        });
    
    }

    CheckLoginStateFB();

    const StatusChangeCallbackFB = (response) => {
        if (response.status === 'connected') {
            console.log('Logged in and authenticated');
            setloginFB(true);
    
            // testAPI();
        } else {
            console.log('Not authenticated');
            setloginFB(false);
    
        }
    
    }

    // load facebook sdk script
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=801174264382809&autoLogAppEvents=1";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


}

