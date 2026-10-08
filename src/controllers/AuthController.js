const USERS = [
    {
        nama:"Reza",
        email:"admin@gmail.com",
        password:"12345678"
    }, 
    {
        nama:"Tri",
        email:"info@gmail.com",
        password:"12345678"
    }
]

//bs juga export const login
export const login =(req,res) =>{
    const {email, password} = req.body
    //atau const email = req.body.email

    if( !email || !password ) {
        res.status(400).json({
            //status 4: eror browser
            //5: server eror / data base (eror query)
            //2: sukses
            status: false,
            message:"Email and password is required"})
    }

    //find()
    const user = USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
        return res.status(401).json({
            status: false,
            message:"Invalid credential" //401:unauthorized /login gagal
        });  
    } 

    res.status(200).json({
        status: true,
        message: "Login success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: `jwt-token-123 ${user.id} - ${Date.now()}`
        }
    })
}