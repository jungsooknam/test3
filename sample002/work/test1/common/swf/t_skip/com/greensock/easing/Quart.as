﻿class com.greensock.easing.Quart
{
    function Quart()
    {
    } // End of the function
    static function easeIn(t, b, c, d)
    {
        t = t / d;
        return (c * (t) * t * t * t + b);
    } // End of the function
    static function easeOut(t, b, c, d)
    {
        t = t / d - 1;
        return (-c * ((t) * t * t * t - 1) + b);
    } // End of the function
    static function easeInOut(t, b, c, d)
    {
        t = t / (d * 0.500000);
        if (t < 1)
        {
            return (c * 0.500000 * t * t * t * t + b);
        } // end if
        t = t - 2;
        return (-c * 0.500000 * ((t) * t * t * t - 2) + b);
    } // End of the function
} // End of Class
