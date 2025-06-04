// route-animations.ts
import {
    animate,
    group,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
                optional: true,
            }),
            group([
                query(
                    ':leave',
                    [
                        style({ transform: 'translateX(0%)', opacity: 1 }),
                        animate(
                            '0.5s ease-out',
                            style({ transform: 'translateX(-100%)', opacity: 0 })
                        ),
                    ],
                    { optional: true }
                ),
                query(
                    ':enter',
                    [
                        style({ transform: 'translateX(100%)', opacity: 0 }),
                        animate(
                            '0.5s ease-out',
                            style({ transform: 'translateX(0%)', opacity: 1 })
                        ),
                    ],
                    { optional: true }
                ),
            ]),
        ]),
    ]);
