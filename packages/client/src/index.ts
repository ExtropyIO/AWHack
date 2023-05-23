import { mount as mountDevTools } from '@latticexyz/dev-tools';
import { setup } from './mud/setup';

import { DrawingApp } from '../canvas';

const {
	components,
	systemCalls: { increment, addPoint },
} = await setup();

// Components expose a stream that triggers when the component is updated.
components.Counter.update$.subscribe((update) => {
	const [nextValue, prevValue] = update.value;
	console.log('Counter updated', update, { nextValue, prevValue });
	document.getElementById('counter')!.innerHTML = String(
		nextValue?.value ?? 'unset'
	);
});

components.Matrix.update$.subscribe((update: { value: [any, any] }) => {
	const [nextValue, prevValue] = update.value;
	console.log('Position updated', update, { nextValue, prevValue });
	document.getElementById('coordinates')!.innerHTML = String(
		(nextValue?.x && nextValue?.y) ?? +'unset'
	);
});

// Just for demonstration purposes: we create a global function that can be
// called to invoke the Increment system contract via the world. (See IncrementSystem.sol.)
(window as any).increment = async () => {
	console.log('new counter value:', await increment());
};

(window as any).addPoint = async (x: number, y: number) => {
	console.log('new point value:', await addPoint(x, y));
};

const drawPad = new DrawingApp(addPoint);

mountDevTools();
