const subscribing = () => {
    const subscribers: Array<() => void> = [];
    return {
        subscribe(handle: () => void) {
			subscribers.push(handle);
		},
        trigger() {
            subscribers.forEach((s) => s());
        }
    }
}

export const createState = () => {
	let value = 0;
    const sus = subscribing();
    const baseController = buildController(sus);

	setTimeout(() => {
		value++;
		sus.trigger();
	}, 3000);
	return {
		...baseController,

		get state() {
			return {
				value
			};
		}
	};
};

export const createStateFixed = () => {
	let value = 0;
    const sus = subscribing();
    const baseController = buildController(sus);

	setTimeout(() => {
		value++;
		sus.trigger();
	}, 3000);
	return {
		subscribe: baseController.subscribe,

		get state() {
			return {
				value
			};
		}
	};
};

function buildController(sus: ReturnType<typeof subscribing>) {
	let prevState = '{}';

	const hasStateChanged = (currentState: Record<string, unknown>): boolean => {
		try {
			const stringifiedState = JSON.stringify(currentState);
			const hasChanged = prevState !== stringifiedState;
			prevState = stringifiedState;
			return hasChanged;
		} catch (e) {
			console.warn(
				'Could not detect if state has changed, check the controller "get state method"',
				e
			);
			return true;
		}
	};

	return {
		subscribe(listener: () => void) {
			listener();
			return sus.subscribe(() => {
				if (hasStateChanged(this.state)) {
					listener();
				}
			});
		},

		get state() {
			return {};
		}
	};
}
