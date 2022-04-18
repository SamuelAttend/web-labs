const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

app.get('/login', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) =>
{
    fs.readFile(path.join(__dirname, 'users.txt'), 'utf8', (error, data) =>
    {
        if (error)
        {
            console.log(error);
        }

        let resp = "";

        let list = data.split('\n');

        for (let i = 0; i < list.length; i++)
        {
            let emailpassword = list[i].split(';');

            let email = emailpassword[0];
            let password = emailpassword[1];

            if (email == req.body.email)
            {
               if (password == req.body.password)
               {
                   resp = "Welcome back, " + email.split('@')[0] + "!";
               }
               else
               {
                   resp = "Incorrect password!";
               }
            }
        }

        if (!resp)
        {
            resp = "Welcome to the family, " + req.body.email.split('@')[0] + "!";

            fs.appendFile(path.join(__dirname, 'users.txt'), req.body.email + ';' + req.body.password + '\n', () => {});
        }

        return res.send(resp);
    });
});

app.get('/admin', (req, res) =>
{
    if (req.headers.secret == 'I know the secret')
    {
        fs.readFile(path.join(__dirname, 'users.txt'), 'utf8', (error, data) =>
        {
            if (error)
            {
                console.log(error);
            }

            let resp = "";

            let list = data.split('\n');

            for (let i = 0; i < list.length; i++)
            {
                resp += list[i].split(';')[0].split('@')[0] + '\n';
            }

            return res.send(resp);
        });
    }
    else
    {
        res.sendStatus(403);
    }
})

app.listen(3000);