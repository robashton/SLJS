using System;
using JSIL.Meta;
using JSIL.Proxy;

namespace SL2JS.Proxies
{
    [JSProxy("System.Windows.DependencyProperty")]
    public abstract class DependencyProperty
    {
        [JSRuntimeDispatch]
        [JSExternal]
        public DependencyProperty(params AnyType[] values)
        {
            
        }

        [JSRuntimeDispatch]
        [JSExternal]
        public abstract AnyType GetMetadata(params AnyType[] values);
        

        [JSRuntimeDispatch]
        [JSExternal]
        public static AnyType RegisterCoreProperty(params AnyType[] values)
        {
            throw new NotImplementedException();
        }

        [JSRuntimeDispatch]
        [JSExternal]
        public static AnyType Register(params AnyType[] values)
        {
            throw new NotImplementedException();
        }

        [JSRuntimeDispatch]
        [JSExternal]
        public static AnyType RegisterReadonly(params AnyType[] values)
        {
            throw new NotImplementedException();
        }

        [JSRuntimeDispatch]
        [JSExternal]
        public static AnyType RegisterAttached(params AnyType[] values)
        {
            throw new NotImplementedException();
        }

        [JSRuntimeDispatch]
        [JSExternal]
        public static AnyType RegisterAttachedReadonly(params AnyType[] values)
        {
            throw new NotImplementedException();
        }
    }
}
