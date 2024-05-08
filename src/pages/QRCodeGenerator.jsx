import {MainLayout} from "../layouts/MainLayout";
import QRCodeForm from "../components/qr-code-generator";

export function QRCodeGenerator() {

	console.log(process.env.SERVER)
	return (
		<>
				<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
					Click Me
				</button>
				<QRCodeForm />
		</>
	)
}