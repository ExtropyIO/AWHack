import { getComponentValue } from '@latticexyz/recs';
import { awaitStreamValue } from '@latticexyz/utils';
import { ClientComponents } from './createClientComponents';
import { SetupNetworkResult } from './setupNetwork';

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
	{ worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
	{ Counter, Matrix }: ClientComponents
) {
	const increment = async () => {
		const tx = await worldSend('increment', []);
		await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
		return getComponentValue(Counter, singletonEntity);
	};

	const addPoint = async (x: number, y: number) => {
		const tx = await worldSend('addPoint', [x, y]);
		console.log('addPoint', x, y);
		await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
		return getComponentValue(Matrix, singletonEntity);
	};

	return {
		increment,
		addPoint,
	};
}
