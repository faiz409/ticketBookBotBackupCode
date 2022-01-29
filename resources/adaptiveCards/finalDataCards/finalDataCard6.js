module.exports = {
    finalDataCard6: function(...value) {
        return {
            type: 'AdaptiveCard',
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            version: '1.3',
            body: [
                {
                    type: 'ColumnSet',
                    columns: [
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: 'Name',
                                    wrap: true
                                }
                            ]
                        },
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: `${ value[0] }`,
                                    wrap: true,
                                    horizontalAlignment: 'Right'
                                }
                            ]
                        }
                    ],
                    style: 'accent'
                },
                {
                    type: 'ColumnSet',
                    columns: [
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    wrap: true,
                                    text: 'Mobile No.'
                                }
                            ]
                        },
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: `${ value[1] }`,
                                    wrap: true,
                                    horizontalAlignment: 'Right'
                                }
                            ]
                        }
                    ],
                    style: 'accent'
                },
                {
                    type: 'ColumnSet',
                    columns: [
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    wrap: true,
                                    text: 'Email'
                                }
                            ]
                        },
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: `${ value[2] }`,
                                    wrap: true,
                                    horizontalAlignment: 'Right'
                                }
                            ]
                        }
                    ],
                    style: 'accent'
                },
                {
                    type: 'ColumnSet',
                    columns: [
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    wrap: true,
                                    text: 'Number Of Person'
                                }
                            ]
                        },
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: `${ value[3] }`,
                                    wrap: true,
                                    horizontalAlignment: 'Right'
                                }
                            ]
                        }
                    ],
                    style: 'accent'
                },
                {
                    type: 'ColumnSet',
                    columns: [
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    wrap: true,
                                    text: 'Ticket Fees'
                                }
                            ]
                        },
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: `${ value[4] }`,
                                    wrap: true,
                                    horizontalAlignment: 'Right'
                                }
                            ]
                        }
                    ],
                    style: 'accent'
                },
                {
                    type: 'ColumnSet',
                    columns: [
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    wrap: true,
                                    text: 'Selected Places'
                                }
                            ]
                        },
                        {
                            type: 'Column',
                            width: 'stretch',
                            items: [
                                {
                                    type: 'TextBlock',
                                    text: `${ value[5] } :- ${ value[6] } ,
                                    \n${ value[7] } :- ${ value[8] } ,
                                    \n${ value[9] } :- ${ value[10] } ,
                                    \n${ value[11] } :- ${ value[12] } ,
                                    \n${ value[13] } :- ${ value[14] } ,
                                    \n${ value[15] } :- ${ value[16] }`,
                                    wrap: true,
                                    horizontalAlignment: 'Left'
                                }
                            ]
                        }
                    ],
                    style: 'accent'
                }
            ]
        };
    }
};
