import z from "zod";


export const loginSchema = z.object({
	email: z.string().email(),
		password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
		.regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
		.regex(/[0-9]/, "Password must contain at least 1 number")
		.regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character"),

});

export const patientRegisterSchema = z.object({
	name: z.string()
	.min(3, "Name must be at least 3 characters long!!")
	.max(10),
	email: z.string().email("Not email!!"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
		.regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
		.regex(/[0-9]/, "Password must contain at least 1 number")
		.regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character"),
		confirmPassword: z.string().min(1, "please confirm your password"),
		contactNumber: z.string()
		                .refine( (val) => val === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(val),{
							message: "Please provide valid Bangladeshi number"
						})
						.optional(),
		
}).refine((data => data.password === data.confirmPassword), {
	message: "Password do not match ",
	path: ["confirmPassword"]
})


//* Gp - 017, 013
//* BL - 019, 014
//* Airtel - 016
//* Robi - 018 
//* TeleTake - 015