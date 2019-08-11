const handleRegister = (req,res, db, bcrypt)=> {
    const {email, name, password} = req.body;
    const saltRounds = 10;
    const hashRes = bcrypt.hashSync(password, saltRounds);

    if(!name || !email || !password){
        return res.status(400).json("Wrong submission! Try again!");
    }

    // We are using "transactions" because we have to update two tables
    db.transaction(trx => {
        trx.insert({
            hash:hashRes,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
           return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0], 
                entries: 0,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    
    .catch(err => res.status(400).json("Unable to Register!"));
    
}

module.exports = {
    handleRegister: handleRegister
};