function isValid()
{
    let email = document.getElementById("email_input");
    let password = document.getElementById("password_input");

    if (email.value.length > 3 && email.value.includes('@') && email.value.includes('.'))
    {
        email.style["border-color"] = null;
    }
    else
    {
        email.style["border-color"] = "red";
    }

    if (/^[0-9a-zA-Z]+$/.test(password.value))
    {
        password.style["border-color"] = null;
    }
    else
    {
        password.style["border-color"] = "red";
    }
}

function isDarkTheme()
{
    let darktheme = document.getElementById("darktheme_checkbox");

    if (darktheme.checked)
    {
        document.body.style.backgroundImage = null;
        document.querySelector("button").style["border-color"] = null;
        document.querySelector("img").style["border-color"] = null;
        document.querySelector("img").style["box-shadow"] = null;
    }
    else
    {
        document.body.style.backgroundImage = "url(majima-kiryu-yakuza0.jpg)";
        document.querySelector("button").style["border-color"] = "crimson";
        document.querySelector("img").style["border-color"] = "crimson";
        document.querySelector("img").style["box-shadow"] = "inset 0 10px 0 crimson, inset -10px 0 0 crimson, inset 0 -10px 0 crimson, inset 10px 0 0 crimson, inset -7.5px 7.5px 0 crimson, inset -7.5px -7.5px 0 crimson, inset 7.5px -7.5px 0 crimson, inset 7.5px 7.5px 0 crimson";
    }
}