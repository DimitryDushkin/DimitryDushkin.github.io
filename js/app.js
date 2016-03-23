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
            var x = cellEl.offset().left,
                y = cellEl.offset().top,
                type = cellEl.data('type');

            if (type === 'door') {
                // ???
            }

            this.hero.move(x, y);
        }
    });

    provide();
});

modules.define('stage', ['i-bem__dom', 'BEMHTML'], function(provide, BEM, BEMHTML) {
    var stageData = [
        [ '-',  '0',    '-',    '-',    '-',    '-',    '-' ],
        [ '-',  '0',    '0',    '0',    '0',    '0',    '-' ],
        [ '-',  '+',    '+',    '+',    '+',    '0',    '-' ],
        [ '-',  '0',    '0',    '0',    '0',    '0',    '-' ],
        [ '-',  '0',    '+',    '+',    '+',    '+',    '-' ],
        [ '-',  '0',    '0',    '0',    '0',    '0',    '-' ],
        [ '-',  '-',    '-',    '-',    '-',    'd-btn','-' ]
    ];

    function getType(sign) {
        var door;

        switch (sign) {
            case '-': return 'wall';
            case '0': return 'hall';
            case '+': return 'rock';
        }

        door = sign.match(/d\-(.*)/)[1];
        if (door) {
            return 'door';
        }
    }

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
                        var type = getType(cell);

                        return {
                            elem: 'cell',
                            elemMods: { type: type },
                            attrs: {
                                'data-type': type,
                                'data-door': type === 'door' ? cell : ''
                            }
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
