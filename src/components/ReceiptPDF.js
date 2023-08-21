/** @format */

import { Page, Text, View, Document } from "@react-pdf/renderer";
import { formatReadableDate } from "../utils/Functions";

const ReceiptPDF = ({ purchaseInfo }) => {
	return (
		<Document>
			<Page
				size="A4"
				style={{
					flexDirection: "column",
					padding: 20,
				}}>
				<View
					style={{
						marginBottom: 20,
						textAlign: "center",
					}}>
					<Text>Purchase Receipt</Text>
				</View>
				<View
					style={{
						marginBottom: 20,
					}}>
					<Text
						style={{
							fontWeight: "bold",
						}}>
						Name:
					</Text>
					<Text>{purchaseInfo.name}</Text>
				</View>
				<View
					style={{
						marginBottom: 20,
					}}>
					<Text
						style={{
							fontWeight: "bold",
						}}>
						Type:
					</Text>
					<Text>{purchaseInfo.type}</Text>
				</View>
				<View
					style={{
						marginBottom: 20,
					}}>
					<Text
						style={{
							fontWeight: "bold",
						}}>
						Age:
					</Text>
					<Text>{purchaseInfo.age} years</Text>
				</View>
				<View
					style={{
						marginBottom: 20,
					}}>
					<Text
						style={{
							fontWeight: "bold",
						}}>
						Price:
					</Text>
					<Text>${purchaseInfo.price}</Text>
				</View>
				<View
					style={{
						marginBottom: 20,
					}}>
					<Text
						style={{
							fontWeight: "bold",
						}}>
						Description:
					</Text>
					<Text>{purchaseInfo.description}</Text>
				</View>
				<View
					style={{
						marginBottom: 20,
					}}>
					<Text
						style={{
							fontWeight: "bold",
						}}>
						Entry Date:
					</Text>
					<Text>
						{formatReadableDate(purchaseInfo.entry_date, "en")}
					</Text>
				</View>
				<View
					style={{
						marginBottom: 20,
					}}>
					<Text
						style={{
							fontWeight: "bold",
						}}>
						Breed:
					</Text>
					<Text>{purchaseInfo.breed}</Text>
				</View>
				<View
					style={{
						marginBottom: 20,
					}}>
					<Text
						style={{
							fontWeight: "bold",
						}}>
						Weight:
					</Text>
					<Text>{purchaseInfo.weight} kg</Text>
				</View>
			</Page>
		</Document>
	);
};

export default ReceiptPDF;
