class com.greensock.core.SimpleTimeline extends com.greensock.core.TweenCore
{
    var _firstChild, _lastChild, cachedTotalTime, cachedTime, __get__rawTime;
    function SimpleTimeline(vars)
    {
        super(0, vars);
    } // End of the function
    function addChild(node)
    {
        if (!node.gc && node.timeline != undefined)
        {
            node.timeline.remove(node, true);
        } // end if
        node.timeline = this;
        if (node.gc)
        {
            node.setEnabled(true, true);
        } // end if
        if (_firstChild)
        {
            _firstChild.prevNode = node;
        } // end if
        node.nextNode = _firstChild;
        _firstChild = node;
        node.prevNode = undefined;
    } // End of the function
    function remove(node, skipDisable)
    {
        if (!node.gc && skipDisable != true)
        {
            node.setEnabled(false, true);
        } // end if
        if (node.nextNode)
        {
            node.nextNode.prevNode = node.prevNode;
        }
        else if (_lastChild == node)
        {
            _lastChild = node.prevNode;
        } // end else if
        if (node.prevNode)
        {
            node.prevNode.nextNode = node.nextNode;
        }
        else if (_firstChild == node)
        {
            _firstChild = node.nextNode;
        } // end else if
    } // End of the function
    function renderTime(time, suppressEvents, force)
    {
        var _loc2 = _firstChild;
        var _loc4;
        var _loc5;
        cachedTotalTime = time;
        cachedTime = time;
        while (_loc2)
        {
            _loc5 = _loc2.nextNode;
            if (_loc2.active || time >= _loc2.cachedStartTime && !_loc2.cachedPaused && !_loc2.gc)
            {
                if (!_loc2.cachedReversed)
                {
                    _loc2.renderTime((time - _loc2.cachedStartTime) * _loc2.cachedTimeScale, suppressEvents, false);
                }
                else
                {
                    _loc4 = _loc2.cacheIsDirty ? (_loc2.__get__totalDuration()) : (_loc2.cachedTotalDuration);
                    _loc2.renderTime(_loc4 - (time - _loc2.cachedStartTime) * _loc2.cachedTimeScale, suppressEvents, false);
                } // end if
            } // end else if
            _loc2 = _loc5;
        } // end while
    } // End of the function
    function get rawTime()
    {
        return (cachedTotalTime);
    } // End of the function
} // End of Class
