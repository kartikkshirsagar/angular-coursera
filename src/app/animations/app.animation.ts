import {trigger,state,style,animate,transition} from '@angular/animations'; 

export const visibility = {
    trig: trigger('visibility',[
        state('shown',style({
          transform: 'scale(1.0)',
          opacity:1
        })),
        state('hidden',style({
          transform:'scale(0.7)',
          opacity: 0
        })),
        transition('*=>*',animate('0.3s ease-in-out'))
      ])
}
   

export const flyInOut = {
    trig:trigger('flyInOut',[
        state('*',style({
            opacity:1,
            transform:'translateX(0)',
        })),
        transition(':enter',[
            style({
                transform: 'translateX(-100%)',
                opacity:0
            }),
            animate('500ms ease-in')
        ]),
        transition(':leave',[
            animate('500ms ease-out'),
            style({
                transform:'translateX(100%)',
                opacity : 0
            })
        ])
    ])
}

export const expand={
    trig:trigger('expand',[
        state('*',style({
            transform: 'translateX(0)',
            opacity:1
        })),
        transition(':enter',[
            style({
                transform: 'translateY(-50%)',
                opacity:0
            }),
            animate('200ms ease-in',style({
                transform: 'translateX(0)',
                opacity:1
            }))
        ])
    ])
};