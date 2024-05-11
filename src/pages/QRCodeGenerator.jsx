import {MainLayout} from "../layouts/MainLayout";
import QRCodeForm from "../components/qr-code-generator";

export function QRCodeGenerator({EntityID,EntityType}) {

	console.log(process.env.SERVER)
	return (
		<>
				<QRCodeForm EntityID={EntityID} EntityType={EntityType} />
		</>
	)
}