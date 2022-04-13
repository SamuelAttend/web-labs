const submit = document.getElementById('form');
submit.addEventListener('submit', function(event)
{
    let email = document.getElementById("email");
    let password = document.getElementById("password");

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

    if (!emailIsValid || !passwordIsValid)
    {
        event.preventDefault();
    }
});