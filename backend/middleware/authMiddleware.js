const jwt = require('jsonwebtoken')

exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" })
        }

        // verify token 
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
}


// Admin Middleware 
exports.isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        return res.status(403).json({ message: "Admin access only" });
    }
}

// student middleware 
exports.isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        next()
    } else {
        return res.status(403).json({ message: "Student access only" });
    }
}


// teacher middleware 
exports.isTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        next()
    } else {
        return res.status(403).json({ message: "Teacher access only" });
    }
}