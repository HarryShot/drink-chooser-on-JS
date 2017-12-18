var addition_saver_reader = (function () {

    var _data = [];

    /// add elem to local variable DATA
    function _add(name, cost) {
        _data.push({
            id: getCurrentId(),
            name: name,
            cost: cost
        });
    }

    //save data to localStorage
    function _save() {
        window.localStorage["addition"] = JSON.stringify(_data, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val
        });
    }

    //read data from localStorage
    function _read() {
        var temp = window.localStorage["addition"];

        if (!temp) _data = [];
        else _data = JSON.parse(temp);

        return _data;
    }

    //generate ID for element in storage
    function getCurrentId() {
        if (!_data || _data.length == 0) return 0;
        else return (_data[_data.length - 1].id)+1;
    }

    return {
        data: _data,
        add: _add,
        save: _save,
        read: _read
    };

})();