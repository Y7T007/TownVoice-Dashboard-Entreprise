import {MainLayout} from "../layouts/MainLayout";
import QRCodeForm from "../components/qr-code-generator";

export function QRCodeGenerator() {

	console.log(process.env.SERVER)
	return (
		<>
				<QRCodeForm />
		</>
	)
}