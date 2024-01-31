import NavLogo from "../components/nav/NavLogo";


// const Nav = () => {
//     return (
//         <div style={{width: 177, height: 1024, left: 0, top: 0, position: 'relative', background: 'linear-gradient(180deg, rgba(243.41, 44.46, 46.17, 0.09) 0%, rgba(194, 234, 243, 0.39) 68%)'}}>
//             <div style={{width: 177, height: 1024, left: 5, top: 5, position: 'absolute'}}>
//                 <NavLogo />
//             </div>
//             <div style={{width: 177, height: 0, left: 0, top: 201, position: 'absolute', border: '1px black solid'}} />
//           <div style={{width: 150, height: 150, left: 11.78, top: 261, position: 'absolute'}}>
//               <img style={{width: 150, height: 150, left: 0, top: 0, position: 'absolute', borderRadius: 800}} src="https://via.placeholder.com/150x150" />
//               <img style={{width: 98.57, height: 78.78, left: 25.71, top: 34.53, position: 'absolute'}} src="https://via.placeholder.com/99x79" />
//           </div>
//           <div style={{width: 151, height: 143, left: 11.78, top: 459, position: 'absolute'}}>
//             <div style={{width: 151, height: 143, left: 0, top: 0, position: 'absolute', background: '#F1B8B8', borderRadius: 9999}} />
//             <div style={{width: 151, height: 143, left: 0, top: 0, position: 'absolute', background: '#547AFF', borderRadius: 9999}} />
//             <div style={{width: 86, height: 54, left: 33, top: 38, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 30, fontFamily: 'Inter', fontWeight: '800', wordWrap: 'break-word'}}>50%</div>
//             <div style={{width: 134, height: 52, left: 9, top: 66, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '800', wordWrap: 'break-word'}}>학습 진행도</div>
//           </div>
//         </div>
//     );
// }

const Nav = () => {
    return (
        <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: 177,
              height: 1024,
              background: 'linear-gradient(180deg, rgba(243.41, 44.46, 46.17, 0.09) 0%, rgba(194, 234, 243, 0.39) 68%)'
            }}
            dangerouslySetInnerHTML={{ __html: "Df" }}
           />
    );
}

export default Nav;