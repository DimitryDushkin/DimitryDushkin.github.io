modules.define('game', ['i-bem__dom', 'stage', 'hero'], function(provide, BEM) {
    BEM.decl('game', {
        onSetMod: {
            js: {
                inited: function() {
                    this.stage = this.findBlockInside('stage');
                    this.hero = this.findBlockInside('hero');

                    var cellSize = this.stage.getCellSize();

                    this.hero
                        .setSize(cellSize)
                        .move(cellSize, 0);

                    this.stage.on('cell-click', this._onCellClick, this);
                }
            }
        },

        _onCellClick: function(e, cellEl) {
            var x = $(cellEl).offset().left,
                y = $(cellEl).offset().top;

            this.hero.move(x, y);
        }
    });

    provide();
});

modules.define('stage', ['i-bem__dom', 'BEMHTML'], function(provide, BEM, BEMHTML) {
    var stageData = [
        [
            { type: 'wall' },
            { type: 'hall' },
            { type: 'wall' },
            { type: 'wall' },
            { type: 'wall' },
            { type: 'wall' },
            { type: 'wall' }
        ],
        [
            { type: 'wall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'wall' }
        ],
        [
            { type: 'wall' },
            { type: 'rock' },
            { type: 'rock' },
            { type: 'rock' },
            { type: 'rock' },
            { type: 'hall' },
            { type: 'wall' }
        ],
        [
            { type: 'wall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'wall' }
        ],
        [
            { type: 'wall' },
            { type: 'hall' },
            { type: 'rock' },
            { type: 'rock' },
            { type: 'rock' },
            { type: 'rock' },
            { type: 'wall' }
        ],
        [
            { type: 'wall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'hall' },
            { type: 'wall' }
        ],
        [
            { type: 'wall' },
            { type: 'wall' },
            { type: 'wall' },
            { type: 'wall' },
            { type: 'wall' },
            { type: 'door', name: 'touch3Buttons' },
            { type: 'wall' }
        ]
    ];

    BEM.decl('stage', {
        onSetMod: {
            js: {
                inited: function() {
                    this.createLevel();
                }
            }
        },

        createLevel: function() {
            var cellSize = this.getCellSize(),
                el = this.domElem;

            BEM.update(this.domElem, BEMHTML.apply(stageData.map(function(row) {
                return {
                    block: 'stage',
                    elem: 'row',
                    attrs: {
                        style: 'height: ' + cellSize + 'px'
                    },
                    content: row.map(function(cell) {
                        return {
                            elem: 'cell',
                            elemMods: { type: cell.type },
                            attrs: { 'data-type': cell.type }
                        };
                    })
                };
            })));
        },

        getCellSize: function() {
            return parseInt(this.domElem.width() / stageData[0].length);
        }
    }, {
        live: function() {
            this.liveBindTo('cell', 'click', function(e) {
                this.emit('cell-click', e.target);
            });
        }
    })

    provide();

});

modules.define('hero', ['i-bem__dom'], function(provide, BEM) {

    BEM.decl('hero', {
        setSize: function(size) {
            this.domElem
                .width(size)
                .height(size);

            return this;
        },

        move: function(x, y) {
            this.domElem.css('transform', 'translate(' + x + 'px, ' + y + 'px)');
            return this;
        }
    });

    provide();
});

modules.define('door', ['i-bem__dom'], function(provide, BEM) {

    BEM.decl('door', {
    });

    provide();
});
