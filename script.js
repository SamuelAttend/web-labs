function submitForm()
{
    let form = document.createElement('form');
    form.action = "ref.html";

    document.body.append(form);

    form.submit();
}

function isValid()
{
    let email = document.getElementById("email_input");
    let password = document.getElementById("password_input");

    let emailIsValid;
    let passwordIsValid;

    if (email.value.length > 3 && email.value.includes('@') && email.value.includes('.'))
    {
        email.style["border-color"] = null;
        emailIsValid = true;
    }
    else
    {
        email.style["border-color"] = "red";
        emailIsValid = false;
    }

    if (/^[0-9a-zA-Z]+$/.test(password.value))
    {
        password.style["border-color"] = null;
        passwordIsValid = true;
    }
    else
    {
        password.style["border-color"] = "red";
        passwordIsValid = false;
    }

    if (emailIsValid && passwordIsValid)
    {
        submitForm();
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