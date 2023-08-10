import Withdraw from '@/screens/withdraw/Withdraw'

export default function WithdrawPage({ params }: { params: { id: string } }) {
	return <Withdraw params={params} />
}
